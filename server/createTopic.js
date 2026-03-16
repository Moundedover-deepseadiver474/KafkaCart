const kafka = require("./kafka");

async function createTopic() {
  const admin = kafka.admin();
  await admin.connect();

  await admin.createTopics({
    waitForLeaders: true,
    topics: [
      {
        topic: "user-events",
        numPartitions: 3,
        replicationFactor: 1,
      },
    ],
  });

  console.log("Topic created");
  await admin.disconnect();
}

createTopic();