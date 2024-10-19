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

export const TalentsPoolRawSchemaObj = {
    uuid: { type: String, required: true },
user_uuid: { type: String, required: true },
employee_uuids: { type: [String], required: true },

};

export const TalentsPoolRawSchemaOptions = {
  versionKey: false,
  minimize: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

export const TalentsPoolRawSchema = new mongoose.Schema(TalentsPoolRawSchemaObj, TalentsPoolRawSchemaOptions);

//=========================== MISCS_xxx ===========================

export type TalentsPoolRawDoc = mongoose.Document<unknown, any, T.TalentsPoolRaw> &
  Required<{ _id: mongoose.Types.ObjectId | string }>;

export const TalentsPoolRawModel = mongoose.model<T.TalentsPoolRaw>("talents_pool_raw", TalentsPoolRawSchema);

