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

export const GeoCoordsSchemaObj = {
    lat: { type: Number, required: true },
lng: { type: Number, required: true },

};

export const GeoCoordsSchemaOptions = {
  versionKey: false,
  minimize: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
};

export const GeoCoordsSchema = new mongoose.Schema(GeoCoordsSchemaObj, GeoCoordsSchemaOptions);

//=========================== MISCS_xxx ===========================

export type GeoCoordsDoc = mongoose.Document<unknown, any, T.GeoCoords> &
  Required<{ _id: mongoose.Types.ObjectId | string }>;

export const GeoCoordsModel = mongoose.model<T.GeoCoords>("geo_coords", GeoCoordsSchema);

