// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// =============================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Server API File
// =============================================================================================
// Generated at: Sat, 19 Oct 2024 12:58:01 +0000

import * as T from "./types";
export * from "./types";
export interface API {
    authorize(body: T.AuthRequest):Promise<T.AuthResponse>;
    find_employees(auth_claims: AuthClaims,body: T.EmployeeSearchFilter):Promise<T.EmployeeProfileResolved[]>;
    get_company_profile(auth_claims: AuthClaims,):Promise<T.CompanyProfileResolved>;
    update_company_profile(auth_claims: AuthClaims,body: T.CompanyProfilePublic):Promise<T.CompanyProfileResolved>;
    get_talents_pool(auth_claims: AuthClaims,):Promise<T.TalentsPoolResolved>;
    add_to_talents_pool(auth_claims: AuthClaims,employee_uuid: string,):Promise<T.TalentsPoolResolved>;
    remove_from_talents_pool(auth_claims: AuthClaims,employee_uuid: string,):Promise<T.TalentsPoolResolved>;
    drop_db(auth_claims: AuthClaims,):Promise<void>;
    get_vacancies(auth_claims: AuthClaims,):Promise<T.VacancyResolved[]>;
    create_vacancy(auth_claims: AuthClaims,body: T.VacancyPublic):Promise<T.VacancyResolved>;
    delete_vacancy(auth_claims: AuthClaims,vacancy_uuid: string,):Promise<void>;
}
import JWT from "jsonwebtoken";
export type AuthClaims = { user_uuid: string; groups: string[] };

export function jwt_validate(access_token?: string): AuthClaims {
  if (!access_token) throw "JWT_INVALID";
  if (access_token.includes("Bearer ")) {
    access_token = access_token.split("Bearer ")[1];
  }
  const secret = process.env.JWT_SECRET || "secret";
  try {
    const decoded = JWT.verify(access_token, secret) as AuthClaims;
    return decoded;
  } catch (e) {
    if (e instanceof JWT.TokenExpiredError) {
      console.log({ expiredAt: e.expiredAt, now: new Date() });
      throw "JWT_EXPIRED";
    }
    throw "JWT_INVALID";
  }
}


import express from "express";
export function apply_routes(router: express.Router, api: API) {
     router.post("/authorize", async (req, res, next) => {
    try {
      
      
      res.json(await api.authorize(req.body,));
    } catch (e) {
      next(e);
    }
  });

   router.post("/employees/find", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.find_employees(auth_header,req.body,));
    } catch (e) {
      next(e);
    }
  });

   router.get("/company/profile", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.get_company_profile(auth_header,));
    } catch (e) {
      next(e);
    }
  });

   router.post("/company/profile", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.update_company_profile(auth_header,req.body,));
    } catch (e) {
      next(e);
    }
  });

   router.get("/company/talent-pool", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.get_talents_pool(auth_header,));
    } catch (e) {
      next(e);
    }
  });

   router.put("/company/talent-pool/:employee_uuid", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      const {employee_uuid,} = req.params;
      res.json(await api.add_to_talents_pool(auth_header,employee_uuid,));
    } catch (e) {
      next(e);
    }
  });

   router.delete("/company/talent-pool/:employee_uuid", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      const {employee_uuid,} = req.params;
      res.json(await api.remove_from_talents_pool(auth_header,employee_uuid,));
    } catch (e) {
      next(e);
    }
  });

   router.get("/drop-db", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.drop_db(auth_header,));
    } catch (e) {
      next(e);
    }
  });

   router.get("/company/vacancies", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.get_vacancies(auth_header,));
    } catch (e) {
      next(e);
    }
  });

   router.post("/company/vacancy", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      
      res.json(await api.create_vacancy(auth_header,req.body,));
    } catch (e) {
      next(e);
    }
  });

   router.delete("/company/vacancy/:vacancy_uuid", async (req, res, next) => {
    try {
      
        let auth_header: AuthClaims | undefined;
        try {
          auth_header = jwt_validate(req.headers.authorization);
        } catch (e: any) {
          return next(Error(e));
        }

      const {vacancy_uuid,} = req.params;
      res.json(await api.delete_vacancy(auth_header,vacancy_uuid,));
    } catch (e) {
      next(e);
    }
  });

}
