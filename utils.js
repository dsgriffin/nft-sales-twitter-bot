// external
const axios = require('axios');
const retry = require('async-retry');
const _ = require('lodash');
const { ethers } = require('ethers');
// local
const { currencies } = require('./currencies.js');

function _reducer(previous, current) {
  const currency = currencies[current.token.toLowerCase()];

  if (currency !== undefined) {
    const result =
      previous +
      Number(ethers.utils.formatUnits(current.amount, currency.decimals));

    return result;
  } else {
    return previous;
  }
}

function getSeaportSalePrice(decodedLogData) {
  const offer = decodedLogData.offer;
  const consideration = decodedLogData.consideration;

  const offerSideNfts = offer.some(
    (item) =>
      item.token.toLowerCase() === process.env.CONTRACT_ADDRESS.toLowerCase()
  );

  // if nfts are on the offer side, then consideration is the total price, otherwise the offer is the total price
  if (offerSideNfts) {
    const totalConsiderationAmount = consideration.reduce(_reducer, 0);

    return totalConsiderationAmount;
  } else {
    const totalOfferAmount = offer.reduce(_reducer, 0);

    return totalOfferAmount;
  }
}

async function getTokenData(tokenId) {
  try {
    const assetName = await retry(
      async (bail) => {
        // retrieve metadata for asset from opensea
        const response = await axios.get(
          `https://api.opensea.io/api/v1/asset/${process.env.CONTRACT_ADDRESS}/${tokenId}`,
          {
            headers: {
              'X-API-KEY': process.env.X_API_KEY,
            },
          }
        );

        const data = response.data;

        // just the asset name for now, but retrieve whatever you need
        return {
          assetName: _.get(data, 'name'),
        };
      },
      {
        retries: 5,
      }
    );

    return assetName;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
    } else {
      console.error(error.message);
    }
  }
}

module.exports = {
  getSeaportSalePrice: getSeaportSalePrice,
  getTokenData: getTokenData,
};
