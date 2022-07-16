const markets = {
  // X2Y2
  '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3': {
    name: 'X2Y2 ⭕️',
    site: 'https://x2y2.io/eth/',
    logDecoder: [
      {
        type: 'bytes32',
        name: 'itemHash',
      },
      {
        type: 'address',
        name: 'currency',
      },
      {
        type: 'address',
        name: 'to',
      },
      {
        type: 'uint256',
        name: 'amount',
      },
    ],
  },
  // OpenSea Wyvern
  '0x7f268357a8c2552623316e2562d90e642bb538e5': {
    name: 'OpenSea 🌊',
    site: 'https://opensea.io/assets/',
    logDecoder: [
      {
        type: 'bytes32',
        name: 'buyHash',
      },
      {
        type: 'bytes32',
        name: 'sellHash',
      },
      {
        type: 'uint256',
        name: 'price',
      },
    ],
  },
  // LooksRareExchange
  '0x59728544b08ab483533076417fbbb2fd0b17ce3a': {
    name: 'LooksRare 👀💎',
    site: 'https://looksrare.org/collections/',
    logDecoder: [
      {
        type: 'bytes32',
        name: 'orderHash',
      },
      {
        type: 'uint256',
        name: 'orderNonce',
      },
      {
        type: 'address',
        name: 'currency',
      },
      {
        type: 'address',
        name: 'collection',
      },
      {
        type: 'uint256',
        name: 'tokenId',
      },
      {
        type: 'uint256',
        name: 'amount',
      },
      {
        type: 'uint256',
        name: 'price',
      },
    ],
  },
  // Opensea - Seaport
  '0x00000000006c3852cbef3e08e8df289169ede581': {
    name: 'Opensea ⚓️',
    site: 'https://opensea.io/assets/',
    logDecoder: [
      {
        type: 'bytes32',
        name: 'orderHash',
      },
      {
        type: 'address',
        name: 'recipient',
      },
      {
        type: 'tuple[]',
        name: 'offer',
        components: [
          {
            type: 'uint8',
            name: 'itemType',
          },
          {
            type: 'address',
            name: 'token',
          },
          {
            type: 'uint256',
            name: 'identifier',
          },
          {
            type: 'uint256',
            name: 'amount',
          },
        ],
      },
      {
        type: 'tuple[]',
        name: 'consideration',
        components: [
          {
            type: 'uint8',
            name: 'itemType',
          },
          {
            type: 'address',
            name: 'token',
          },
          {
            type: 'uint256',
            name: 'identifier',
          },
          {
            type: 'uint256',
            name: 'amount',
          },
          {
            type: 'address',
            name: 'recipient',
          },
        ],
      },
    ],
  },
};

module.exports = {
  markets: markets,
};
