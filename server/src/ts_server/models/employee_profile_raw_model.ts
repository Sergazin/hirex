// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// ======================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Mongoose
// ======================================================================================
// Generated at: Sat, 19 Oct 2024 12:58:01 +0000
// ===============================================================
import * as T from "../types";
import * as M from ".";

import mongoose from "mongoose";
//=========================== SCHEMA ===========================

export const EmployeeProfileRawSchemaObj = {
    uuid: { type: String, required: true },
name: { type: String, required: true },
surname: { type: String, required: true },
iin: { type: String, required: true },
photo: { type: mongoose.Schema.Types.Mixed, required: true },
bio: { type: String, required: true },
is_man: { type: Boolean, required: true, default: false },
birthdate: { type: Number, required: true },
status: M.EmployeeStatusSchemaObj,
skills: { type: [String], required: true },
languages: { type: [mongoose.Schema.Types.Mixed], required: true },
geocoords: M.GeoCoordsSchemaObj,
education_history: { type: [mongoose.Schema.Types.Mixed], required: true },
employment_history: { type: [mongoose.Schema.Types.Mixed], required: true },
min_salary: { type: Number, required: true },
experience_since: { type: Number, required: true },
user_uuid: { type: String, required: true },
is_sample: { type: Boolean, required: true, default: false },

};

export const EmployeeProfileRawSchemaOptions = {
  versionKey: false,
  minimize: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

export const EmployeeProfileRawSchema = new mongoose.Schema(EmployeeProfileRawSchemaObj, EmployeeProfileRawSchemaOptions);

//=========================== MISCS_xxx ===========================

export type EmployeeProfileRawDoc = mongoose.Document<unknown, any, T.EmployeeProfileRaw> &
  Required<{ _id: mongoose.Types.ObjectId | string }>;

export const EmployeeProfileRawModel = mongoose.model<T.EmployeeProfileRaw>("employee_profile_raw", EmployeeProfileRawSchema);

