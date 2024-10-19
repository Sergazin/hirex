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

export const CompanyProfileRawSchemaObj = {
    uuid: { type: String, required: true },
name: { type: String, required: false },
bin: { type: String, required: false },
logo: { type: mongoose.Schema.Types.Mixed, required: false, default: null },
description: { type: String, required: false },
user_uuid: { type: String, required: false, default: null },
is_sample: { type: Boolean, required: true, default: false },

};

export const CompanyProfileRawSchemaOptions = {
  versionKey: false,
  minimize: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

export const CompanyProfileRawSchema = new mongoose.Schema(CompanyProfileRawSchemaObj, CompanyProfileRawSchemaOptions);

//=========================== MISCS_xxx ===========================

export type CompanyProfileRawDoc = mongoose.Document<unknown, any, T.CompanyProfileRaw> &
  Required<{ _id: mongoose.Types.ObjectId | string }>;

export const CompanyProfileRawModel = mongoose.model<T.CompanyProfileRaw>("company_profile_raw", CompanyProfileRawSchema);

