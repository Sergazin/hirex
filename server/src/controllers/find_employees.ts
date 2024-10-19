import * as T from "../ts_server";
import * as M from "../ts_server/models";

export async function find_employees(
  _auth_claims: T.AuthClaims,
  body: T.EmployeeSearchFilter,
): Promise<T.EmployeeProfileResolved[]> {
  const search_filter: any = {};

  if (body.languages.length) {
    search_filter.$and = body.languages.map((v) => ({ ["languages.name"]: v.name }));
  }
  if (body.skills.length) {
    search_filter.$and = [
      ...(search_filter.$and || []),
      ...body.skills.map((skill) => ({
        skills: { $regex: new RegExp(skill, "i") },
      })),
    ];
  }
  if (body.min_salary > 0) {
    search_filter.min_salary = { $gte: body.min_salary };
  }

  if (body.max_salary > 0) {
    search_filter.min_salary = { ...search_filter.min_salary, $lte: body.max_salary };
  }

  if (body.min_experience_years > 0) {
    const current_year = new Date().getFullYear();
    const experience_since = current_year - body.min_experience_years;
    const experience_since_date = new Date(experience_since, 0, 1);
    search_filter.experience_since = { $lte: experience_since_date };
  }
  console.log(search_filter);

  const employees = await M.EmployeeProfileRawModel.find(search_filter).limit(100).exec();
  return employees;
}
