import mongoose from "mongoose";
import * as T from "../ts_server";
import * as M from "../ts_server/models";
import { v4 } from "uuid";

export async function get_company_profile(auth_claims: T.AuthClaims): Promise<T.CompanyProfileResolved> {
  return await get_company_profile_or_create(auth_claims.user_uuid);
}

export async function update_company_profile(
  auth_claims: T.AuthClaims,
  body: T.CompanyProfilePublic,
): Promise<T.CompanyProfileResolved> {
  const company = await get_company_profile_or_create(auth_claims.user_uuid);
  company.name = body.name;
  company.bin = body.bin;
  company.logo = body.logo;
  company.description = body.description;
  await company.save();
  return company;
}

export async function get_company_profile_or_create(
  user_uuid: string,
): Promise<T.CompanyProfileResolved & mongoose.Document> {
  const found = await M.CompanyProfileRawModel.findOne({ user_uuid });
  if (found) return found;
  const company = new M.CompanyProfileRawModel({
    uuid: v4(),
    name: "",
    bin: "",
    logo: { url: "" },
    description: "",
    user_uuid,
    create_date: new Date(),
    is_sample: false,
  });
  await company.save();
  return company;
}

