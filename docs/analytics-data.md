# GET /analytics/summary

```js
{
  "totalEvents": 72,
  "logins": 1,
  "signups": 1,
  "productViews": 27,
  "addToCart": 25,
  "removeFromCart": 11,
  "orders": 2,
  "revenue": 2334,
  "avgOrderValue": 1167
}
```

# GET /analytics/top-products

```js
[
  {
    "productId": "1",
    "views": 6
  },
  {
    "productId": "5",
    "views": 3
  },
  {
    "productId": "3",
    "views": 2
  },
  {
    "productId": "4",
    "views": 2
  },
  {
    "productId": "6",
    "views": 2
  },
  {
    "productId": "2",
    "views": 1
  },
  {
    "productId": "7",
    "views": 1
  },
  {
    "productId": "8",
    "views": 1
  },
  {
    "productId": "10",
    "views": 1
  },
  {
    "productId": "11",
    "views": 1
  }
]
```

# GET /analytics/cart

```js
{
  "addToCart": 25,
  "removeFromCart": 11
}
```

# GET /analytics/payments

```js
{
  "upi": 2,
  "card": 1,
  "cod": 1
}
```