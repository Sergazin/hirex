import { v4 } from "uuid";
import * as T from "../ts_server";
import * as M from "../ts_server/models";
import mongoose from "mongoose";

export async function get_talents_pool(auth_claims: T.AuthClaims): Promise<T.TalentsPoolResolved> {
  const talents_pool = await M.TalentsPoolRawModel.findOne({ user_uuid: auth_claims.user_uuid });
  if (!talents_pool) {
    throw new Error("Talent pool not found");
  }
  return await resolve_talents_pool(talents_pool.toJSON() as unknown as T.TalentsPoolRaw);
}
export async function add_to_talents_pool(
  auth_claims: T.AuthClaims,
  employee_uuid: string,
): Promise<T.TalentsPoolResolved> {
  const employee = await M.EmployeeProfileRawModel.findOne({ uuid: employee_uuid });
  if (!employee) throw new Error("Employee not found");
  const talents_pool = await get_talents_pool_or_create(auth_claims.user_uuid);
  talents_pool.employee_uuids.push(employee_uuid);
  talents_pool.markModified("employee_uuids");
  await talents_pool.save();
  return await resolve_talents_pool(talents_pool.toJSON() as unknown as T.TalentsPoolRaw);
}
export async function remove_from_talents_pool(
  auth_claims: T.AuthClaims,
  employee_uuid: string,
): Promise<T.TalentsPoolResolved> {
  const talents_pool = await get_talents_pool_or_create(auth_claims.user_uuid);
  talents_pool.employee_uuids = talents_pool.employee_uuids.filter((uuid) => uuid !== employee_uuid);
  talents_pool.markModified("employee_uuids");
  await talents_pool.save();
  return await resolve_talents_pool(talents_pool.toJSON() as unknown as T.TalentsPoolRaw);
}

export async function get_talents_pool_or_create(user_uuid: string): Promise<T.TalentsPoolRaw & mongoose.Document> {
  const found = await M.TalentsPoolRawModel.findOne({ user_uuid });
  if (found) return found;
  const talents_pool = new M.TalentsPoolRawModel({
    uuid: v4(),
    user_uuid,
    employees: [],
  });
  await talents_pool.save();
  return talents_pool;
}

export async function resolve_talents_pool(talents_pool: T.TalentsPoolRaw): Promise<T.TalentsPoolResolved> {
  const employees = await M.EmployeeProfileRawModel.find({ uuid: { $in: talents_pool.employee_uuids } });
  return {
    ...talents_pool,
    employees: employees.map((e) => e.toJSON() as unknown as T.EmployeeProfileResolved),
  };
}
