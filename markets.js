const markets = {
  // X2Y2
  '0x74312363e45dcaba76c59ec49a7aa8a65a67eed3': {
    name: 'X2Y2 ⭕️',
    site: 'https://x2y2.io/eth/',
  },
  // Blur
  '0x000000000000ad05ccc4f10045630fb830b95127': {
    name: 'Blur 🟠',
    site: 'https://blur.io/asset/',
  },
  // LooksRareExchange
  '0x59728544b08ab483533076417fbbb2fd0b17ce3a': {
    name: 'LooksRare 👀💎',
    site: 'https://looksrare.org/collections/',
  },
  // Opensea - Seaport 1.6
  // IMPORTANT: Opensea regularly releases new Seaport versions, you may need to modify this to the latest contract often
  '0x0000000000000068f116a894984e2db1123eb395': {
    name: 'Opensea ⚓️',
    site: 'https://opensea.io/assets/ethereum/',
  }
};

module.exports = {
  markets: markets,
};
