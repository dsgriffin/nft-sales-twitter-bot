// external
const { ethers } = require('ethers');
// local
const { currencies } = require('./currencies.js');

function _reducer(previous, current) {
  const currency = currencies[current.token.toLowerCase()];

  if (currency !== undefined) {
    const result = previous + Number(ethers.utils.formatUnits(current.amount, currency.decimals));

    return result;
  } else {
    return previous;
  }
}

function getSeaportSalePrice(decodedLogData) {
  const offer = decodedLogData.offer;
  const consideration = decodedLogData.consideration;

  const offerSideNfts = offer.some(
    (item) => item.token.toLowerCase() === process.env.CONTRACT_ADDRESS.toLowerCase()
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

module.exports = {
  getSeaportSalePrice: getSeaportSalePrice,
};
