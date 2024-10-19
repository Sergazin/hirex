import { AppError } from "@/errors";
import { createHmac } from "crypto";
import { TelegramInitData, empty_telegram_init_data } from "./types";
import { CONFIG } from "@/config";
import _ from "lodash";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN as string;
if (!TELEGRAM_BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN is not set");

export function verify_telegram_init_data(telegram_init_data_string: string): TelegramInitData {
  if (varify_telegram_init_data(telegram_init_data_string) === false) throw AppError.PERMISSION_DENIED;
  const telegram_init_data_object = telegram_init_data_string_to_object(telegram_init_data_string);
  return telegram_init_data_object;
}

export function telegram_init_data_string_to_object(url_string: string): TelegramInitData {
  if (!url_string && CONFIG.DEV_MODE) return empty_telegram_init_data;
  const params = new URLSearchParams(url_string);
  const obj: any = {};
  params.forEach((value, key) => (obj[key] = value));
  return obj;
}

export function telegram_init_data_string_to_check_string(url_string: string): string {
  const params = new URLSearchParams(url_string);
  const obj: any = {};
  params.forEach((value, key) => {
    if (key === "hash") return;
    obj[key] = value;
  });
  return obj;
}

export const varify_telegram_init_data = (telegram_init_data: string): boolean => {
  const init_data = new URLSearchParams(telegram_init_data);
  const hash = init_data.get("hash");
  const data_to_check: string[] = [];

  init_data.sort();
  init_data.forEach((val, key) => key !== "hash" && data_to_check.push(`${key}=${val}`));

  const secret = createHmac("sha256", "WebAppData").update(TELEGRAM_BOT_TOKEN).digest();

  const _hash = createHmac("sha256", secret).update(data_to_check.join("\n")).digest("hex");

  return hash === _hash;
};
