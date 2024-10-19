import { Lang } from "@/l10n";
import * as nanostores from "nanostores";

export enum UserViewMode {
  WELCOMER = "welcomer",
  EMPLOYEE = "employee",
  COMPANY = "company",
}

export const state = nanostores.map<{
  lang: Lang;
  user_view_mode: UserViewMode;
  dark_mode: boolean;
}>({
  lang: (localStorage.getItem("lang") as Lang) || "en",
  user_view_mode: UserViewMode.COMPANY,
  dark_mode: (localStorage.getItem("dark_mode") as "true" | "false") !== "false",
});

export class AppCubit {
  static state = state;

  static set_lang(lang: Lang) {
    state.setKey("lang", lang);
    localStorage.setItem("lang", lang);
  }

  static set_user_view_mode(mode: UserViewMode) {
    state.setKey("user_view_mode", mode);
  }

  static set_dark_mode(mode: boolean) {
    state.setKey("dark_mode", mode);
    localStorage.setItem("dark_mode", mode.toString());
    if (mode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  static toggle_dark_mode() {
    AppCubit.set_dark_mode(!state.get().dark_mode);
  }
}
if (!state.get().dark_mode) {
  document.body.classList.remove("dark");
}
