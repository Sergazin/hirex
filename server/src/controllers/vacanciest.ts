import { v4 } from "uuid";
import * as T from "../ts_server";
import * as M from "../ts_server/models";

export async function create_vacancy(auth_claims: T.AuthClaims, body: T.VacancyPublic): Promise<T.VacancyResolved> {
  const vacancy: T.VacancyRaw = {
    uuid: v4(),
    user_uuid: auth_claims.user_uuid,
    name: body.name,
    description: body.description,
    min_experience: body.min_experience,
    min_salary: body.min_salary,
    skills: body.skills,
    languages: body.languages,
    is_sample: false,
  };
  const vacancy_doc = new M.VacancyRawModel(vacancy);
  await vacancy_doc.save();
  return vacancy_doc;
}
export async function get_vacancies(auth_claims: T.AuthClaims): Promise<T.VacancyResolved[]> {
  return await M.VacancyRawModel.find({ user_uuid: auth_claims.user_uuid });
}

export async function delete_vacancy(auth_claims: T.AuthClaims, vacancy_uuid: string): Promise<void> {
  const found = await M.VacancyRawModel.findOne({ user_uuid: auth_claims.user_uuid, uuid: vacancy_uuid });
  if (!found) throw new Error("Vacancy not found");

  await found.deleteOne();
}
