// external
const { Alchemy, Network, Contract } = require('alchemy-sdk');
const retry = require('async-retry');
const _ = require('lodash');
const { ethers } = require('ethers');
// local
const { markets } = require('./markets.js');
const { getSeaportSalePrice } = require('./utils.js');
const { currencies } = require('./currencies.js');
const { transferEventTypes, saleEventTypes } = require('./log_event_types.js');
const { tweet } = require('./tweet');
const abi = require('./abi.json');
const marketsAbi = require('./markets_abi.json');

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET
});

// sometimes monitoring events can return duplicate transactions in a split second, so...
let lastTransactionHash;

async function monitorContract() {
  const provider = await alchemy.config.getWebSocketProvider();
  
  const contract = new Contract(process.env.CONTRACT_ADDRESS, abi, provider);

  const interface = new ethers.utils.Interface(marketsAbi);

  contract.on('Transfer', async (...params) => {

    const event = params[params.length - 1];

    const transactionHash = event.transactionHash.toLowerCase();

    // duplicate transaction - skip process
    if (transactionHash == lastTransactionHash) {
      return;
    }

    lastTransactionHash = transactionHash;

    // attempt to retrieve the receipt, sometimes not available straight away
    const receipt = await retry(
      async (bail) => {
        const rec = await alchemy.core.getTransactionReceipt(transactionHash);

        if (rec == null) {
          throw new Error('receipt not found, try again');
        }

        return rec;
      },
      {
        retries: 5,
      }
    );

    const recipient = receipt.to.toLowerCase();

    // not a marketplace transaction transfer, skip
    if (!(recipient in markets)) {
      return;
    }

    // retrieve market details
    const market = _.get(markets, recipient);

    // default to eth, see currencies.js for currently support currencies
    let currency = {
      name: 'ETH',
      decimals: 18,
      threshold: 1,
    };
    let tokens = [];
    let totalPrice = 0;

    for (let log of receipt.logs) {
      const logAddress = log.address.toLowerCase();

      // if non-ETH transaction
      if (logAddress in currencies) {
        currency = currencies[logAddress];
      }

      // token(s) part of the transaction
      if (log.data == '0x' && transferEventTypes.includes(log.topics[0])) {
        const tokenId = ethers.BigNumber.from(log.topics[3]).toString();

        tokens.push(tokenId);
      }

      // transaction log - decode log in correct format depending on market & retrieve price
      if (logAddress == recipient && saleEventTypes.includes(log.topics[0])) {
        // get the decoded data from the logs
        const decodedLogData = interface.parseLog({
          data: log.data,
          topics: [...log.topics]
        })?.args;

        if (market?.name == 'Opensea ⚓️') {
          totalPrice = getSeaportSalePrice(decodedLogData);
        } else if (market.name == 'Blur 🟠') {
          totalPrice = Number(ethers.utils.formatUnits(
            decodedLogData.sell.price,
            currency.decimals
          ));
        } else if (market.name == 'X2Y2 ⭕️') {
          totalPrice = Number(ethers.utils.formatUnits(
            decodedLogData.amount,
            currency.decimals
          ));
        } else if (market.name == 'LooksRare 👀💎') {
          totalPrice = Number(ethers.utils.formatUnits(
            decodedLogData.price,
            currency.decimals
          ));
        }
      }
    }

    // remove any dupes
    tokens = _.uniq(tokens);
    
    // format price
    totalPrice = _.round(totalPrice * tokens.length, 2);

    // custom - don't post sales below a currencies manually set threshold
    // if (Number(totalPrice) < currency.threshold) {
    //     console.log(`Sale under ${currency.threshold}: Token ID: ${tokens[0]}, Price: ${totalPrice}, Market: ${market.name}`);

    //     return;
    // }

    // retrieve metadata for the first (or only) ERC-721 asset sold
    const metadata = await alchemy.nft.getNftMetadata(
      process.env.CONTRACT_ADDRESS,
      tokens[0],
      {}
    );

    // if more than one asset sold, link directly to etherscan tx, otherwise the marketplace item
    if (tokens.length > 1) {
      tweet(
        `${metadata.title} & other assets bought for ${totalPrice} ${currency.name} on ${
          market.name
        } https://etherscan.io/tx/${transactionHash}`
      );
    } else {
      tweet(
        `${metadata.title} bought for ${totalPrice} ${currency.name} on ${market.name} ${
          market.site
        }${process.env.CONTRACT_ADDRESS}/${tokens[0]}`
      );
    }
  });
}

// initate websocket connection
monitorContract();
