// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// =============================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Client API File
// =============================================================================================
// Generated at: Sat, 19 Oct 2024 12:58:01 +0000
import * as T from "./types";
export * from "./types";
import type { AxiosInstance } from "axios";

export class API {
  axios_client: AxiosInstance;
  sub_path: string;

  constructor(axios_client: AxiosInstance, sub_path = "") {
    this.sub_path = sub_path;
    this.axios_client = axios_client;
  }

async authorize(body: T.AuthRequest):Promise<T.AuthResponse>{ let resp = await this.axios_client.post<T.AuthResponse>(`${this.sub_path}/authorize`, body);
return resp.data; }
async find_employees(body: T.EmployeeSearchFilter):Promise<T.EmployeeProfileResolved[]>{ let resp = await this.axios_client.post<T.EmployeeProfileResolved[]>(`${this.sub_path}/employees/find`, body);
return resp.data; }
async get_company_profile():Promise<T.CompanyProfileResolved>{ let resp = await this.axios_client.get<T.CompanyProfileResolved>(`${this.sub_path}/company/profile`);
return resp.data; }
async update_company_profile(body: T.CompanyProfilePublic):Promise<T.CompanyProfileResolved>{ let resp = await this.axios_client.post<T.CompanyProfileResolved>(`${this.sub_path}/company/profile`, body);
return resp.data; }
async get_talents_pool():Promise<T.TalentsPoolResolved>{ let resp = await this.axios_client.get<T.TalentsPoolResolved>(`${this.sub_path}/company/talent-pool`);
return resp.data; }
async add_to_talents_pool(employee_uuid: string,):Promise<T.TalentsPoolResolved>{ let resp = await this.axios_client.put<T.TalentsPoolResolved>(`${this.sub_path}/company/talent-pool/${employee_uuid}`);
return resp.data; }
async remove_from_talents_pool(employee_uuid: string,):Promise<T.TalentsPoolResolved>{ let resp = await this.axios_client.delete<T.TalentsPoolResolved>(`${this.sub_path}/company/talent-pool/${employee_uuid}`);
return resp.data; }
async drop_db():Promise<void>{ let resp = await this.axios_client.get<void>(`${this.sub_path}/drop-db`);
return resp.data; }
async get_vacancies():Promise<T.VacancyResolved[]>{ let resp = await this.axios_client.get<T.VacancyResolved[]>(`${this.sub_path}/company/vacancies`);
return resp.data; }
async create_vacancy(body: T.VacancyPublic):Promise<T.VacancyResolved>{ let resp = await this.axios_client.post<T.VacancyResolved>(`${this.sub_path}/company/vacancy`, body);
return resp.data; }
async delete_vacancy(vacancy_uuid: string,):Promise<void>{ let resp = await this.axios_client.delete<void>(`${this.sub_path}/company/vacancy/${vacancy_uuid}`);
return resp.data; }
}