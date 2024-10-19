import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VacancyResolved } from "@/ts_client";
import { useNavigate } from "@tanstack/react-router";
import { Briefcase, DollarSign, Languages } from "lucide-react";
import { EmployeeSearchCubit } from "../company/cubit";
import { VacancyCubit } from "./cubit";
import Swal from "sweetalert2";
import { l10n } from "@/l10n";

export default function VacancyCard($: { vacancy: VacancyResolved }) {
  const nav = useNavigate();
  return (
    <div className="w-full p-2 bg-background border  rounded-lg p-4">
      <div>
        <div className="text-2xl font-bold">{$.vacancy.name}</div>
      </div>
      <div className="grid gap-2  py-0">
        <p className="text-sm text-muted-foreground">{$.vacancy.description}</p>
        {$.vacancy.min_salary > 0 && (
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{l10n("Min. Salary")}: ${$.vacancy.min_salary.toLocaleString()}/year</span>
          </div>
        )}

        {$.vacancy.min_experience > 0 && (
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{l10n("Min. Experience")}: {$.vacancy.min_experience} years</span>
          </div>
        )}

        <div>
          <h3 className="mb-2 text-sm font-medium">{l10n("Required Skills")}:</h3>
          <div className="flex flex-wrap gap-2">
            {$.vacancy.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {$.vacancy.languages.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-medium">{l10n("Languages")}:</h3>
            <div className="flex flex-wrap gap-2">
              {$.vacancy.languages.map((lang, index) => (
                <Badge key={index} variant="outline" className="flex items-center space-x-1">
                  <Languages className="h-3 w-3" />
                  <span>{lang.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4 w-full flex gap-4">
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => {
              Swal.fire({
                title: l10n("Are you sure?"),
                text: l10n("You won't be able to revert this!"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: l10n("Yes, delete it!"),
                cancelButtonText: l10n("No, keep it"),
              }).then((result) => {
                if (result.isConfirmed) VacancyCubit.delete_vacancy($.vacancy.uuid);
              });
            }}
          >
            {l10n("Delete Vacancy")}
          </Button>
          <Button
            className="w-full"
            onClick={() => {
              EmployeeSearchCubit.set_filter({
                skills: $.vacancy.skills,
                languages: $.vacancy.languages,
                min_salary: $.vacancy.min_salary,
                min_experience_years: $.vacancy.min_experience,
              });
              nav({ to: `/` });
            }}
          >
            {l10n("Search Employees")}
          </Button>
        </div>
      </div>
    </div>
  );
}
