export enum AppErrors {
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
  JWT_EXPIRED = "JWT_EXPIRED",
  JWT_INVALID = "JWT_INVALID",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  UNDEFINED_ERROR = "UNDEFINED_ERROR",
}

export class AppError {
  code: AppErrors;
  constructor(code: AppErrors) {
    if (AppErrors.hasOwnProperty(code)) {
      this.code = code as AppErrors;
    } else {
      throw new Error("Invalid error code: " + code);
    }
  }

  static NOT_IMPLEMENTED = new AppError(AppErrors.NOT_IMPLEMENTED);
  static JWT_EXPIRED = new AppError(AppErrors.JWT_EXPIRED);
  static JWT_INVALID = new AppError(AppErrors.JWT_INVALID);
  static PERMISSION_DENIED = new AppError(AppErrors.PERMISSION_DENIED);
  static USER_ALREADY_EXISTS = new AppError(AppErrors.USER_ALREADY_EXISTS);
  static USER_NOT_FOUND = new AppError(AppErrors.USER_NOT_FOUND);
  static UNDEFINED_ERROR = new AppError(AppErrors.UNDEFINED_ERROR);

  get message() {
    switch (this.code) {
      case AppErrors.NOT_IMPLEMENTED:
        return "This method is not implemented yet, please ask the developer to implement it.";
      case AppErrors.JWT_EXPIRED:
        return "Session expired, please login again.";
      case AppErrors.JWT_INVALID:
        return "Invalid token, please login again.";
      case AppErrors.PERMISSION_DENIED:
        return "Permission denied.";
      case AppErrors.USER_ALREADY_EXISTS:
        return "User already exists. Please choose another login.";
      case AppErrors.USER_NOT_FOUND:
        return "User not found. Please check the login.";
      case AppErrors.UNDEFINED_ERROR:
        return "Undefined error. Please contact the developer";
    }
  }
}

import { ErrorRequestHandler } from "express";
export const error_middleware: ErrorRequestHandler = function (err: Error, _req, res, _next) {
  console.log("AppError", err);
  let error = err instanceof AppError ? err : new AppError(AppErrors.UNDEFINED_ERROR);
  res.status(400).json({ domain: "APP_ERROR", code: error.code, message: error.message });
};
