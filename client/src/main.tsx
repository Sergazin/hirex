import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./telegram/inits";
import { router } from "./router.ts";
import { RouterProvider } from "@tanstack/react-router";
import { AuthCubit } from "./cubits/auth_cubit.ts";
import { EmployeeSearchCubit } from "./sections/company/cubit.ts";
import "./ai/completions";
import { CompanyProfileCubit } from "./sections/company_profile/cubit.ts";
import { TalentsPoolCubit } from "./sections/talent_pool/cubit.ts";
import { VacancyCubit } from "./sections/vacancies/cubit.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

// INITIALIZATION OF CUBITS
{
  AuthCubit.on_auth(() => {
    EmployeeSearchCubit.init();
    CompanyProfileCubit.init();
    TalentsPoolCubit.init();
    VacancyCubit.init();
  });
  AuthCubit.init(window.Telegram.WebApp.initData);
}
