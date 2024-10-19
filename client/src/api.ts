import axios from "axios";
import { API } from "./ts_client";
export const hirex_api = new API(axios, "api");
