import fs from "fs";
import mongoose from "mongoose";
import * as T from "../ts_server";
import { employee_generator } from "@/sample_data/employees";

export async function drop_db(_auth_claims: T.AuthClaims): Promise<void> {
  await mongoose.connection.db?.dropDatabase();
  await generate_fill_up_db();
  //await fill_up_db();
}

export async function fill_up_db() {
  const dump = JSON.parse(fs.readFileSync("db_dump.json", "utf-8"));

  for (const collection_name in dump) {
    if (!mongoose.connection.db) throw new Error("No db connection");
    if (dump[collection_name].length === 0) continue;
    const collection = mongoose.connection.db.collection(collection_name);
    await collection.insertMany(dump[collection_name]);
  }
}

export async function generate_fill_up_db() {
  const dump: {
    user_raws: T.UserRaw[];
    employee_profile_raws: T.EmployeeProfileRaw[];
  } = {
    user_raws: [],
    employee_profile_raws: employee_generator(10000, "00000000-0000-0000-0000-000000000000"),
  };

  for (const collection_name in dump) {
    if (!mongoose.connection.db) throw new Error("No db connection");
    if ((dump as any)[collection_name].length === 0) continue;
    const collection = mongoose.connection.db.collection(collection_name);
    await collection.insertMany((dump as any)[collection_name]);
  }
}
