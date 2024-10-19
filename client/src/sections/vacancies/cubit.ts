import { hirex_api } from "@/api";
import { VacancyPublic, VacancyResolved } from "@/ts_client";
import * as nanostores from "nanostores";
import Swal from "sweetalert2";
import "./ai_function_calls";
import {l10n} from "@/l10n";

const state = nanostores.map<{
  vacancies: VacancyResolved[];
}>({
  vacancies: [],
});

const api = hirex_api;

export class VacancyCubit {
  static state = state;

  static async init() {
    const vacancies = await api.get_vacancies();
    state.setKey("vacancies", vacancies);
  }

  static async create_vacancy(vacancy: VacancyPublic) {
    const new_vacancy = await api.create_vacancy(vacancy);
    state.setKey("vacancies", [...state.get().vacancies, new_vacancy]);
    Swal.fire(l10n("Vacancy created"), l10n("The vacancy has been created"), "success");
  }

  static async delete_vacancy(vacancy_uuid: string) {
    await api.delete_vacancy(vacancy_uuid);
    state.setKey(
      "vacancies",
      state.get().vacancies.filter((v) => v.uuid !== vacancy_uuid),
    );
    Swal.fire(l10n("Vacancy deleted"), l10n("The vacancy has been deleted"), "success");
  }
}
