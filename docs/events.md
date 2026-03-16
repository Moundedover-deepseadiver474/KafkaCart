# Login Event  

```js
sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "USER_LOGIN",
      userId: userData.userId,
      timestamp: Date.now(),
      source: "web",
      metadata: {}
    })
```

# Sign Up Event

```js
sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "USER_SIGNUP",
      userId: userData.userId,
      timestamp: Date.now(),
      source: "web",
      metadata: {}
    })
```

# Logout Event

```js
sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "USER_LOGOUT",
      userId: user.userId,
      timestamp: Date.now(),
      source: "web",
      metadata: {}
    })
```

# Product View

```js
sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "PRODUCT_VIEW",
      userId: user?.userId,
      productId: productId,
      timestamp: Date.now(),
      source: "web",
      metadata: {}
    });
```

# Add to card Event

```js
sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "ADD_TO_CART",
      userId: user?.userId,
      productId: product.id,
      timestamp: Date.now(),
      source: "web",
      metadata: {
        price: product.price
      }
    });
```

# Remove from cart Event

```js
sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "REMOVE_FROM_CART",
      userId: user?.userId,
      productId: id,
      timestamp: Date.now(),
      source: "web",
      metadata: {}
    });
```

# Checkout Event

```js
sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "CHECKOUT_STARTED",
      userId: user.userId,
      timestamp: Date.now(),
      source: "web",
      metadata: {
        cartValue: getCartTotal(),
        items: getCartItemsCount()
      }
    });
```

# Payment method Event

```js
sendEvent({
        eventId: crypto.randomUUID(),
        eventType: "PAYMENT_METHOD_SELECTED",
        userId: user?.userId,
        timestamp: Date.now(),
        source: "web",
        metadata: {
          method: value
        }
      });
```

# Order placed event

```js
sendEvent({
      eventId: crypto.randomUUID(),
      eventType: "ORDER_PLACED",
      userId: user.userId,
      timestamp: Date.now(),
      source: "web",
      metadata: {
        orderId: crypto.randomUUID(),
        totalAmount: getCartTotal(),
        items: getCartItemsCount()
      }
    });
```