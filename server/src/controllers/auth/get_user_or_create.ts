import { TelegramUserData } from "./types";
import * as M from "@/ts_server/models";
import * as T from "@/ts_server";
import { v4 } from "uuid";

export async function get_user_or_create(telegram_user_data: TelegramUserData): Promise<T.UserRaw> {
  const found = await M.UserRawModel.findOne({ telegram_id: telegram_user_data.id });

  if (found) {
    found.telegram_user_data = JSON.stringify(telegram_user_data);
    if (found.allows_write_to_pm !== telegram_user_data.allows_write_to_pm)
      found.allows_write_to_pm = telegram_user_data.allows_write_to_pm;
    if (found.first_name !== telegram_user_data.first_name) found.first_name = telegram_user_data.first_name;
    if (found.last_name !== telegram_user_data.last_name) found.last_name = telegram_user_data.last_name;
    if (found.username !== telegram_user_data.username) found.username = telegram_user_data.username;
    await found.save();
    return found;
  } else {
    let user = new M.UserRawModel({
      uuid: v4(),
      telegram_id: telegram_user_data.id,
      first_name: telegram_user_data.first_name,
      last_name: telegram_user_data.last_name,
      username: telegram_user_data.username,
      allows_write_to_pm: telegram_user_data.allows_write_to_pm,
      telegram_user_data: JSON.stringify(telegram_user_data),
      create_date: new Date(),
      is_sample: false,
    });
    await user.save();
    return user;
  }
}
