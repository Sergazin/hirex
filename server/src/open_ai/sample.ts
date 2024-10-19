import WebSocket from "ws";

const realtime_url = "wss://api.openai.com/v1/realtime";
const query_params = "?model=gpt-4o-realtime-preview-2024-10-01";
const url = realtime_url + query_params;

export const openai_ws = new WebSocket(url, {
  headers: {
    Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    "OpenAI-Beta": "realtime=v1",
  },
});
openai_ws.on("open", function open() {
  console.log("Connected to OpenAI server");
  //openai_ws.send( JSON.stringify({ type: "response.create", response: { modalities: ["text"], instructions: "Please assist the user.", }, }),);
});

openai_ws.on("message", function incoming(message) {
  console.log(JSON.parse(message.toString()));
});
