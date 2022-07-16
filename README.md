# NFT Sales Twitter Bot 🤖

This was made to succeed my [Opensea Sales Twitter Bot](https://github.com/dsgriffin/opensea-sales-twitter-bot) repo; while relying on the OpenSea Events API is simpler, it doesn't include any NFT sales happening in other, newer marketplaces.

So, we need to monitor & process Ethereum event logs for ERC-721 token transactions directly, before posting any sales to Twitter.

## Aims 🎯

The aim is to monitor all sales across Ethereum for a given contract. However, different marketplaces can send sale logs in different formats, so we need to process major market logs manually (see `markets.js`).

Right now `Opensea`, `LooksRare` & `X2Y2` marketplaces are integrated, but it should be easy to add others in the future.

## Donations 💵

...are greatly appreciated 🙏

Eth Address: 0xDCA88f66CEc8972D23DE7d5e69c40E087C92132f

## Setup 🔧

### - abi.json

- Retrieve the **Contract ABI** for the contract you're looking to monitor, from somewhere like [EtherScan](https://etherscan.io), in JSON format, and include it in `abi.json`.

### - Alchemy (or another Web3 service provider e.g. Infura, Moralis)

- Create an account at [Alchemy.com](https://alchemy.com) & create a new application on Ethereum mainnet. Once you've created a project, you should be able to grab the API key for it

### - OpenSea (or another service with an NFT metadata API, e.g. Moralis, Venly)

- Request an OpenSea API key [here](https://docs.opensea.io/reference/api-overview)

### - Twitter

- Request a [Twitter Developer Account](https://developer.twitter.com/en/apply-for-access) (with [Elevated Access](https://developer.twitter.com/en/portal/products/elevated), then create a Twitter Developer App (make sure you change it to have both read/write permissions)

- Make sure you are logged in to the Twitter account you want the bot to run on (as the next step will be authorizing the bot to post on your account)

- Install [Twurl](https://github.com/twitter/twurl) and, using your Twitter Developer consumer key & secret, generate the access token & access secret

### - Heroku

- Create a new Heroku account + app (a $7 a month dyno instance should be enough but it'll depend on usage) & set the project as a remote branch of your git repo (see [Heroku Remote](https://devcenter.heroku.com/articles/git#creating-a-heroku-remote))

In the Settings section of your Heroku app you'll see a **Config Vars** section. Add the following config vars:

- **CONSUMER_KEY** - Your Twitter Developer App's Consumer Key
- **CONSUMER_SECRET** - Your Twitter Developer App's Consumer Secret
- **ACCESS_TOKEN_KEY** - The Access Token Key of the Twitter Account your bot is posting from
- **ACCESS_TOKEN_SECRET** - The Access Token Secret of the Twitter Account your bot is posting from
- **CONTRACT_ADDRESS** - The contract address you want to monitor sales for
- **ALCHEMY_API_KEY** - Your unique Alchemy API key
- **X_API_KEY** - Your unique OpenSea API key

Now you're ready to release - just push up the code via. git to the Heroku remote (see [Heroku Remote](https://devcenter.heroku.com/articles/git#creating-a-heroku-remote) if unsure how).

Make sure you are using `worker` dynos and not `web` dynos - you can set this in the CLI your project with:

```sh
heroku ps:scale web=0
heroku ps:scale worker=1
```

## Modification 🛠

In `app.js`, you'll notice there's some commented out logic for only posting sales above a certain `threshold` that you can modify per-currency in `currencies.js`.

## Credits

[Kenryu42](https://github.com/kenryu42) for their help on adding seaport support

## License 📃

This code is licensed under the [ISC License](https://choosealicense.com/licenses/isc/).

Please include proper attribution to my original repo if you fork, modify or utilize this repo in any way. Thank you!
