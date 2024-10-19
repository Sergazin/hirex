import CompanyProfileEditor from "@/sections/company_profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/edit-company-profile")({
  component: CompanyProfileEditor,
});
