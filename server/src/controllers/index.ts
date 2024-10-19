import * as T from "../ts_server";
import { authorize } from "./auth";
import { get_company_profile, update_company_profile } from "./company";
import { drop_db } from "./dev_only";
import { find_employees } from "./find_employees";
import { add_to_talents_pool, get_talents_pool, remove_from_talents_pool } from "./talents_pool";
import { create_vacancy, delete_vacancy, get_vacancies } from "./vacanciest";

export class Controller implements T.API {
  drop_db = drop_db;
  authorize = authorize;
  find_employees = find_employees;
  get_company_profile = get_company_profile;
  update_company_profile = update_company_profile;
  get_talents_pool = get_talents_pool;
  add_to_talents_pool = add_to_talents_pool;
  remove_from_talents_pool = remove_from_talents_pool;
  create_vacancy = create_vacancy;
  get_vacancies = get_vacancies;
  delete_vacancy = delete_vacancy;
}
