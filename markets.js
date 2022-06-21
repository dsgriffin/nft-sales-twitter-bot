const markets = {
    // OpenSea Contract Address
    '0x7f268357a8c2552623316e2562d90e642bb538e5' : {
        'name': 'OpenSea 🌊',
        'site': 'https://opensea.io/assets/',
        'logDecoder': [{
            type: 'bytes32',
            name: 'buyHash'
        }, {
            type: 'bytes32',
            name: 'sellHash',
        },{
            type: 'uint256',
            name: 'price',
        }]
    },
      // OpenSea Seaport Contract Address
  "0x00000000006c3852cbef3e08e8df289169ede581": {
    name: "OpenSea 🌊 Seaport",
    site: "https://opensea.io/assets/",
    logDecoder: [
      {
        name: "orderHash",
        type: "bytes32",
      },
      {
        indexed: true,
        name: "purchaser",
        type: "address",
      },
      {       
        name: "offerOffset",
        type: "uint256",
      },
      {
        name: "considerationOffset",
        type: "uint256",
      },{
        name: "offerLength",
        type: "uint256",
      },
      {
        name: "offerItemType",
        type: "uint256",
      },
      {
        name: "offerToken",
        type: "address",
      },
      {
        name: "offerIdentifier",
        type: "uint256",
      },
      {
        name: "offerAmount",
        type: "uint256",
      },
      {
        name: "offerConsiderationLength",
        type: "uint256",
      },
      
      
    ],
  },
    // LooksRareExchange Contract Address
    '0x59728544b08ab483533076417fbbb2fd0b17ce3a' : {
        'name': 'LooksRare 👀💎',
        'site': 'https://looksrare.org/collections/',
        'logDecoder': [{
            type: 'bytes32',
            name: 'orderHash'
        }, {
            type: 'uint256',
            name: 'orderNonce',
        },{
            type: 'address',
            name: 'currency',
        },{
            type: 'address',
            name: 'collection',
        },{
            type: 'uint256',
            name: 'tokenId',
        },{
            type: 'uint256',
            name: 'amount',
        },{
            type: 'uint256',
            name: 'price',
        }]
    }
};

module.exports = {
    markets: markets
};
