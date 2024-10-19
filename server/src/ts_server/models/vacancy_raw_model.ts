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

export const VacancyRawSchemaObj = {
    uuid: { type: String, required: true },
name: { type: String, required: true },
description: { type: String, required: true },
skills: { type: [String], required: true },
languages: { type: [mongoose.Schema.Types.Mixed], required: true },
min_salary: { type: Number, required: true, default: 0 },
min_experience: { type: Number, required: true, default: 0 },
user_uuid: { type: String, required: true },
is_sample: { type: Boolean, required: true, default: false },

};

export const VacancyRawSchemaOptions = {
  versionKey: false,
  minimize: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

export const VacancyRawSchema = new mongoose.Schema(VacancyRawSchemaObj, VacancyRawSchemaOptions);

//=========================== MISCS_xxx ===========================

export type VacancyRawDoc = mongoose.Document<unknown, any, T.VacancyRaw> &
  Required<{ _id: mongoose.Types.ObjectId | string }>;

export const VacancyRawModel = mongoose.model<T.VacancyRaw>("vacancy_raw", VacancyRawSchema);

