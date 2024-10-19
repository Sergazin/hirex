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

export const UserRawSchemaObj = {
    uuid: { type: String, required: true },
telegram_id: { type: Number, required: true },
first_name: { type: String, required: true },
last_name: { type: String, required: true },
username: { type: String, required: true },
telegram_user_data: { type: String, required: true },
allows_write_to_pm: { type: Boolean, required: true, default: false },
create_date: { type: Number, required: true },
is_sample: { type: Boolean, required: true, default: false },

};

export const UserRawSchemaOptions = {
  versionKey: false,
  minimize: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

export const UserRawSchema = new mongoose.Schema(UserRawSchemaObj, UserRawSchemaOptions);

//=========================== MISCS_xxx ===========================

export type UserRawDoc = mongoose.Document<unknown, any, T.UserRaw> &
  Required<{ _id: mongoose.Types.ObjectId | string }>;

export const UserRawModel = mongoose.model<T.UserRaw>("user_raw", UserRawSchema);

