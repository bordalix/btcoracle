# BTC Oracle

Cloudflare worker that queries about a dozen BTC price sources and returns the median price in USD and EUR.

Check [sources.ts](./src/sources.ts) for the list of price sources.

Returned JSON:

```JSON
{
  "eur": 40223.35,
  "usd": 43869.18
}
```
