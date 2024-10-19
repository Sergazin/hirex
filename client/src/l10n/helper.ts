import { LANG_CODES, Lang } from ".";
import { l10n_translates } from "./translates";

class X {
  static check_translation_exist = (text: string) => {
    for (const lang of LANG_CODES) {
      if (!l10n_translates[lang][text]) {
        X.need_to_be_translated[lang][text] = "";
      }
    }
    X.save_local_storage();
  };

  static need_to_be_translated: { [key in Lang]: { [key: string]: string } } = {
    en: {},
    ru: {},
    kz: {},
  };

  static load_from_local_storage() {
    const from_local_storage = localStorage.getItem("need_to_be_translated");
    if (from_local_storage) {
      X.need_to_be_translated = JSON.parse(from_local_storage);
    } else {
      X.save_local_storage();
    }
  }

  static save_local_storage() {
    localStorage.setItem("need_to_be_translated", JSON.stringify(X.need_to_be_translated));
  }
}

X.load_from_local_storage();

export const TranslationHelper = X;
