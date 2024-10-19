// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// ======================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Mongoose
// ======================================================================================
// Generated at: Sat, 19 Oct 2024 12:58:01 +0000
// ===============================================================
import mongoose from "mongoose";
//=========================== SCHEMA ===========================

export const EmployeeStatusSchemaObj = { type: { "name": String }, required: true, default: { "name": "actively_looking_for_job"}, enum: ["ACTIVELY_LOOKING_FOR_JOB", "OPEN_TO_OFFERS", "CONSIDERING_JOB_OFFER", "STARTING_NEW_JOB_SOON", "NOT_LOOKING", ] };
