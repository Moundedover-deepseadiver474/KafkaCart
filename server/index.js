const express = require("express");
const cors = require("cors");
const kafka = require("./kafka");

const app = express();
const PORT = 3000;

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

/* ---------------- KAFKA ---------------- */

const producer = kafka.producer({
  retry: { retries: 5 }
});

const consumer = kafka.consumer({
  groupId: "analytics-group"
});

/* ---------------- ANALYTICS STATE ---------------- */

const analytics = {
  totalEvents: 0,
  logins: 0,
  signups: 0,
  productViews: 0,
  addToCart: 0,
  removeFromCart: 0,
  orders: 0,
  revenue: 0,
  productViewsCount: {},
  paymentMethods: {}
};

/* ---------------- EVENT INGESTION ---------------- */

app.post("/events", async (req, res) => {
  try {

    if (!req.body?.eventType) {
      return res.status(400).json({
        status: "error",
        message: "eventType is required"
      });
    }

    const event = {
      ...req.body,
      receivedAt: Date.now()
    };

    await producer.send({
      topic: "user-events",
      messages: [
        { value: JSON.stringify(event) }
      ]
    });

    res.json({
      status: "success",
      message: "Event sent to Kafka"
    });

  } catch (err) {

    console.error("Producer error:", err);

    res.status(500).json({
      status: "error",
      message: "Failed to send event"
    });

  }
});

/* ---------------- ANALYTICS ENDPOINTS ---------------- */

app.get("/analytics/summary", (req, res) => {

  const avgOrderValue = analytics.orders === 0 ? 0 : analytics.revenue / analytics.orders;

  res.json({
    totalEvents: analytics.totalEvents,
    logins: analytics.logins,
    signups: analytics.signups,
    productViews: analytics.productViews,
    addToCart: analytics.addToCart,
    removeFromCart: analytics.removeFromCart,
    orders: analytics.orders,
    revenue: analytics.revenue,
    avgOrderValue
  });

});

app.get("/analytics/top-products", (req, res) => {

  const topProducts = Object.entries(analytics.productViewsCount)
    .map(([productId, views]) => ({
      productId,
      views
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  res.json(topProducts);

});

app.get("/analytics/cart", (req, res) => {

  res.json({
    addToCart: analytics.addToCart,
    removeFromCart: analytics.removeFromCart
  });

});

app.get("/analytics/payments", (req, res) => {

  res.json(analytics.paymentMethods);

});

/* ---------------- KAFKA CONSUMER ---------------- */

async function startConsumer() {

  await consumer.connect();

  await consumer.subscribe({
    topic: "user-events",
    fromBeginning: false
  });

  console.log("Kafka consumer started...");

  await consumer.run({
    eachMessage: async ({ message }) => {

      try {

        const value = message.value?.toString();

        if (!value) return;

        const event = JSON.parse(value);

        analytics.totalEvents++;

        switch (event.eventType) {

          case "USER_LOGIN":
            analytics.logins++;
            break;

          case "USER_SIGNUP":
            analytics.signups++;
            break;

          case "PRODUCT_VIEW":

            analytics.productViews++;

            if (event.productId) {

              analytics.productViewsCount[event.productId] =
                (analytics.productViewsCount[event.productId] || 0) + 1;

            }

            break;

          case "ADD_TO_CART":
            analytics.addToCart++;
            break;

          case "REMOVE_FROM_CART":
            analytics.removeFromCart++;
            break;

          case "ORDER_PLACED":

            analytics.orders++;

            if (event.metadata?.totalAmount) {

              analytics.revenue += Number(event.metadata.totalAmount);

            }

            if (event.metadata?.paymentMethod) {

              const method = event.metadata.paymentMethod;

              analytics.paymentMethods[method] =
                (analytics.paymentMethods[method] || 0) + 1;

            }

            break;

          default:
            console.log("Unknown event type:", event.eventType);

        }

      } catch (err) {

        console.error(
          "Invalid Kafka message:",
          message.value?.toString()
        );

      }

    }
  });

}

/* ---------------- SERVER START ---------------- */

async function startServer() {

  try {

    await producer.connect();
    console.log("Kafka producer connected");

    await startConsumer();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {

    console.error("Server startup failed:", err);
    process.exit(1);

  }

}

startServer();

/* ---------------- GRACEFUL SHUTDOWN ---------------- */

async function shutdown() {

  console.log("Shutting down...");

  try {

    await producer.disconnect();
    await consumer.disconnect();

  } catch (err) {

    console.error("Shutdown error:", err);

  }

  process.exit(0);

}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);