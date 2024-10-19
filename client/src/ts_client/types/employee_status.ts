// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// ==================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Type
// ==================================================================================
// Generated at: Sat, 19 Oct 2024 12:58:01 +0000
// ===============================================================
export enum EmployeeStatusEnum { ActivelyLookingForJob = "ACTIVELY_LOOKING_FOR_JOB",OpenToOffers = "OPEN_TO_OFFERS",ConsideringJobOffer = "CONSIDERING_JOB_OFFER",StartingNewJobSoon = "STARTING_NEW_JOB_SOON",NotLooking = "NOT_LOOKING", }

export type EmployeeStatusActivelyLookingForJob = { name: EmployeeStatusEnum.ActivelyLookingForJob;
 };
export type EmployeeStatusOpenToOffers = { name: EmployeeStatusEnum.OpenToOffers;
 };
export type EmployeeStatusConsideringJobOffer = { name: EmployeeStatusEnum.ConsideringJobOffer;
 };
export type EmployeeStatusStartingNewJobSoon = { name: EmployeeStatusEnum.StartingNewJobSoon;
 };
export type EmployeeStatusNotLooking = { name: EmployeeStatusEnum.NotLooking;
 };

export type EmployeeStatus = | EmployeeStatusActivelyLookingForJob| EmployeeStatusOpenToOffers| EmployeeStatusConsideringJobOffer| EmployeeStatusStartingNewJobSoon| EmployeeStatusNotLooking
