import { hirex_api } from "@/api";
import { EmployeeProfileResolved, EmployeeSearchFilter } from "@/ts_client";
import * as nanostores from "nanostores";

export const empty_filter: EmployeeSearchFilter = {
  statuses: [],
  skills: [],
  languages: [],
  geocoords: { lat: 0, lng: 0 },
  radius: 100000,
  min_salary: 0,
  max_salary: 0,
  min_experience_years: 0,
};

const state = nanostores.map<{
  filter: EmployeeSearchFilter;
  employees: EmployeeProfileResolved[];
}>({
  filter: empty_filter,
  employees: [],
});

const api = hirex_api;

export class EmployeeSearchCubit {
  static state = state;
  static async init() {
    await this.fetch();
  }
  static async fetch() {
    const $ = state.get();
    const employees = await api.find_employees($.filter);
    state.setKey("employees", employees);
  }

  static async set_filter(filter: Partial<EmployeeSearchFilter>) {
    state.setKey("filter", {
      ...empty_filter,
      ...filter,
    });
    await this.fetch();
  }
}
