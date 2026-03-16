const kafka = require("./kafka");

const consumer = kafka.consumer({ groupId: "analytics-group" });

const analytics = {
  totalEvents: 0,
  logins: 0,
  productViews: 0,
  addToCart: 0,
  removeFromCart: 0,
  orders: 0,
  productViewsCount: {}
};

async function consume() {

  await consumer.connect();

  await consumer.subscribe({
    topic: "user-events",
    fromBeginning: false
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      try {
        const event = JSON.parse(message.value.toString());
        console.log(`Topic: [${topic}] Event received:`, event);

        analytics.totalEvents++;

        if (event.eventType === "USER_LOGIN") analytics.logins++;
        if (event.eventType === "PRODUCT_VIEW") {
          analytics.productViews++;

          const p = event.productId;
          analytics.productViewsCount[p] = (analytics.productViewsCount[p] || 0) + 1;
        }
        if (event.eventType === "ADD_TO_CART") analytics.addToCart++;
        if (event.eventType === "REMOVE_FROM_CART") analytics.removeFromCart++;
        if (event.eventType === "ORDER_PLACED") analytics.orders++;

        console.log("Analytics:", analytics);
      } catch (err) {
        console.log("Invalid message:", message.value.toString());
      }
    }
  });

}

consume();
