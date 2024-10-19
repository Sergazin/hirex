import { l10n_translates } from "./translates";
import { CONFIG } from "@/config";
import { TranslationHelper } from "./helper";
import { AppCubit } from "@/cubits/app_cubit";

export function l10n(text: string): string {
  const $ = AppCubit.state.get();
  const found = l10n_translates[$.lang][text];

  if (!found && CONFIG.DEV_MODE) {
    TranslationHelper.check_translation_exist(text);
  }

  //return "xxxxxxxxx";

  return found || text;
}

export const LANG_CODES = ["en", "ru", "kz"] as const;
export type Lang = (typeof LANG_CODES)[number];
