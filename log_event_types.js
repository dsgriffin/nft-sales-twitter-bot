const transferEventTypes = [
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" // Transfer
];

const saleEventTypes = [
    "0xc4109843e0b7d514e4c093114b863f8e7d8d9a458c372cd51bfe526b588006c9", // OrdersMatched
    "0x95fb6205e23ff6bda16a2d1dba56b9ad7c783f67c96fa149785052f47696f2be", // TakerBid (LooksRare)
    "0x68cd251d4d267c6e2034ff0088b990352b97b2002c0476587d0c4da889c11330" // TakerAsk (LooksRare)
];

module.exports = {
    transferEventTypes: transferEventTypes,
    saleEventTypes: saleEventTypes
};