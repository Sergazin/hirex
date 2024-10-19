import { RealtimeClient } from "@openai/realtime-api-beta";
import WebSocket from "ws";
import { OPENAI_RELAY_PATHNAME } from ".";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set");

const log = console.log;

const url = "wss://api.openai.com/v1/realtime?model=gpt-4-turbo";
//const url = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01";

export async function openai_relay_connection_handler(ws: WebSocket, req: any) {
  //if (!req.url) { log("No URL provided, closing connection."); ws.close(); return; }

  //const url = new URL(req.url, `http://${req.headers.host}`);
  //const pathname = url.pathname;

  //if (pathname !== OPENAI_RELAY_PATHNAME) { log(`Invalid pathname: "${pathname}"`); ws.close(); return; }

  // Instantiate new client
  log(`Connecting with key "${OPENAI_API_KEY.slice(0, 3)}..."`);
  console.log(OPENAI_API_KEY);
  const client = new RealtimeClient({
    //url: "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01",
    apiKey: OPENAI_API_KEY,
    debug: true,
  });

  // Relay: OpenAI Realtime API Event -> Browser Event
  client.realtime.on("server.*", (event: any) => {
    log(`Relaying "${event.type}" to Client`);
    ws.send(JSON.stringify(event));
  });

  client.realtime.on("close", () => ws.close());

  // Relay: Browser Event -> OpenAI Realtime API Event
  // We need to queue data waiting for the OpenAI connection
  const message_queue: any[] = [];
  const messageHandler = (data: any) => {
    try {
      const event = JSON.parse(data);
      log(`Relaying "${event.type}" to OpenAI`);
      client.realtime.send(event.type, event);
    } catch (e: any) {
      console.error(e.message);
      log(`Error parsing event from client: ${data}`);
    }
  };
  ws.on("message", (data) => {
    if (!client.isConnected()) {
      message_queue.push(data);
    } else {
      messageHandler(data);
    }
  });
  ws.on("close", () => client.disconnect());

  // Connect to OpenAI Realtime API
  try {
    log(`Connecting to OpenAI...`);
    await client.connect();
  } catch (e: any) {
    log(`Error connecting to OpenAI: ${e.message}`);
    ws.close();
    return;
  }
  log(`Connected to OpenAI successfully!`);
  while (message_queue.length) {
    messageHandler(message_queue.shift());
  }
}
