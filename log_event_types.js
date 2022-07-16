const transferEventTypes = [
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer
];

const saleEventTypes = [
  '0xc4109843e0b7d514e4c093114b863f8e7d8d9a458c372cd51bfe526b588006c9', // OrdersMatched (Opensea Wyvern)
  '0xe2c49856b032c255ae7e325d18109bc4e22a2804e2e49a017ec0f59f19cd447b', // EvProfit (X2Y2)
  '0x95fb6205e23ff6bda16a2d1dba56b9ad7c783f67c96fa149785052f47696f2be', // TakerBid (LooksRare)
  '0x68cd251d4d267c6e2034ff0088b990352b97b2002c0476587d0c4da889c11330', // TakerAsk (LooksRare)
  '0x9d9af8e38d66c62e2c12f0225249fd9d721c54b83f48d9352c97c6cacdcb6f31', // OrderFulfilled (Opensea Seaport)
];

module.exports = {
  transferEventTypes: transferEventTypes,
  saleEventTypes: saleEventTypes,
};
