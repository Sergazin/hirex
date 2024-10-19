import JWT from "jsonwebtoken";
import * as T from "@/ts_server";
import { verify_telegram_init_data } from "./verify_telegram_init_data";
import { TelegramUserData } from "./types";
import { get_user_or_create } from "./get_user_or_create";

export async function authorize(body: T.AuthRequest): Promise<T.AuthResponse> {
  const init_data = verify_telegram_init_data(body.telegram_init_data);
  const telegram_user_data = JSON.parse(init_data.user) as TelegramUserData;
  const user_doc = await get_user_or_create(telegram_user_data);
  return {
    telegram_user_data_json: JSON.stringify(telegram_user_data),
    auth_token: jwt_sign({ user_uuid: user_doc.uuid, groups: [] }),
  };
}

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");

export function jwt_sign(claims: T.AuthClaims): string {
  return JWT.sign(claims, JWT_SECRET, { expiresIn: "365d" });
}
