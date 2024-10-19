import { hirex_api } from "@/api";
import { l10n } from "@/l10n";
import { CompanyProfilePublic, CompanyProfileResolved } from "@/ts_client";
import * as nanostores from "nanostores";
import { toast } from "sonner";
import "./ai_function_call";

const state = nanostores.map<{
  editing: boolean;
  company_profile: CompanyProfileResolved;
}>({
  editing: false,
  company_profile: {
    uuid: "",
    name: "",
    bin: "",
    logo: {
      url: "",
    },
    description: "",
    user_uuid: "",
    is_sample: false,
  },
});

const api = hirex_api;

export class CompanyProfileCubit {
  static state = state;

  static async init() {
    const company_profile = await api.get_company_profile();
    state.setKey("company_profile", company_profile);
  }
  static async edit_company_profile(editing: boolean) {
    state.setKey("editing", editing);
  }
  static async save_company_profile(profile: Partial<CompanyProfilePublic>) {
    const $ = state.get();
    const company_profile = await api.update_company_profile({
      ...$.company_profile,
      ...profile,
    });
    state.setKey("company_profile", company_profile);
    toast(l10n("Company profile updated successfully"));
  }
}
