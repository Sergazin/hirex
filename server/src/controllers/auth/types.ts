export type TelegramUserData = {
  id: number; //1045440;
  first_name: string; // "卂尺爪卂几";
  last_name: string; //"卄ㄩ尺卂匚卂几";
  username: string; //"sergazin";
  language_code: "en" | "ru";
  allows_write_to_pm: boolean;
};

export type TelegramInitData = {
  user: string;
  chat_instance: string; //"3877681265701980796";
  chat_type: "sender";
  auth_date: string; //"1729242280";
  hash: string; //"51b49cb798ca28b35f01378e0cb080745e3f4ffeb31a8e983fd0a2e291e2420d";
};

export const empty_telegram_init_data: TelegramInitData = {
  user: JSON.stringify({
    id: 0,
    first_name: "Non MiniApp",
    last_name: "Non MiniApp",
    username: "",
    language_code: "en",
    allows_write_to_pm: false,
  }),
  chat_instance: "",
  chat_type: "sender",
  auth_date: "",
  hash: "",
};
