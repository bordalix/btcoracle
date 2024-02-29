# BTC Oracle

Cloudflare worker that queries about a dozen BTC price sources and returns the median price in USD and EUR.

Check [sources.ts](./src/sources.ts) for the list of price sources.

Returned JSON:

```JSON
{
  "pricefeed": {
    "eur": 58031.63,
    "usd": 62977.6
  },
  "publickey": "publickey",
  "signature": "signature",
  "timestamp": 1709207259
}
```

### Dev

```
$ yarn dev
$ yarn deploy
```
