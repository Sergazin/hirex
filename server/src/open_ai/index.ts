import { WebSocketServer } from "ws";
import { openai_relay_connection_handler } from "./realtime_relay";
import { http_server } from "../init/web_server";

export const OPENAI_RELAY_PATHNAME = "/api/openai-realtime-relay";

const openai_relay_wss = new WebSocketServer({
  //port: parseInt(OPENAI_RELAY_PORT),
  path: OPENAI_RELAY_PATHNAME,
  server: http_server,
});

openai_relay_wss.on("connection", openai_relay_connection_handler);
