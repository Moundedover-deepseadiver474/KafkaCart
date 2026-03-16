const EVENT_API = "http://localhost:3000/events";

export const sendEvent = async (event) => {
  try {
    await fetch(EVENT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    });
  } catch (error) {
    console.error("Failed to send event:", error);
  }
};
