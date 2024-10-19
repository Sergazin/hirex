import { hirex_api } from "@/api";
import axios from "axios";
import * as nanostores from "nanostores";

type TelegramUserData = {
  id: number; //1045440;
  first_name: string; // "卂尺爪卂几";
  last_name: string; //"卄ㄩ尺卂匚卂几";
  username: string; //"sergazin";
  language_code: "en" | "ru";
  allows_write_to_pm: boolean;
};
const on_auth_callbacks: Function[] = [];

const state = nanostores.map<{
  inited: boolean;
  authorized: boolean;
  user_data: TelegramUserData;
}>({
  inited: false,
  authorized: false,
  user_data: {
    id: 0,
    first_name: "Non MiniApp",
    last_name: "Non MiniApp",
    username: "",
    language_code: "en",
    allows_write_to_pm: false,
  },
});

const api = hirex_api;

export class AuthCubit {
  static state = state;
  static on_auth(callback: Function) {
    on_auth_callbacks.push(callback);
  }
  static async init(telegram_init_data: string) {
    const resp = await api.authorize({ telegram_init_data });
    axios.defaults.headers.common["Authorization"] = `Bearer ${resp.auth_token}`;
    state.set({ inited: true, authorized: true, user_data: JSON.parse(resp.telegram_user_data_json) });
    on_auth_callbacks.forEach((cb) => cb());
  }
}
