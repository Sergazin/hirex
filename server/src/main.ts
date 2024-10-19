import { Controller } from "./controllers";
import init_db from "./init/db";
import { router, start_server } from "./init/web_server";
import "./open_ai";
import { apply_routes } from "./ts_server";
import "./init/ai_proxy";

async function main() {
  await init_db();
  console.log("DB initialized");
  apply_routes(router, new Controller());
  await start_server();
}

main();
