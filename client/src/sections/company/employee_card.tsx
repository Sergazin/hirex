import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmployeeProfileResolved } from "@/ts_client";
import { useStore } from "@nanostores/react";
import React from "react";
import { TalentsPoolCubit } from "../talent_pool/cubit";
import { l10n } from "@/l10n";

export const EmployeeItem: React.FC<{ employee: EmployeeProfileResolved }> = ({ employee }) => {
  const talents_pool_state = useStore(TalentsPoolCubit.state);
  const is_in_talents_pool = talents_pool_state.talents_pool.employee_uuids?.includes(employee.uuid);

  return (
    <div className="border-b pb-4">
      <div className="flex items-center gap-4 mb-4 pl-2 pr-3">
        <img src={employee.photo.url} alt={employee.name} className="w-16 h-16 rounded-full object-cover" />
        <div className="grow">
          <h2 className="text-lg font-semibold">
            {employee.surname} {employee.name}
          </h2>
          <div>
            {l10n("Experience")}:{" "}
            {Math.round((new Date().getTime() - employee.experience_since) / 1000 / 60 / 60 / 24 / 365)}{" "}
            {l10n("years")}
          </div>
          {/*<p className="text-sm text-muted-foreground">{employee.geocoords.lat}</p>*/}
          <Badge variant="default">{employee.status.name.replace(/_/g, " ")}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <Button className="rounded-full w-12 h-12" onClick={() => TalentsPoolCubit.toggle_employee(employee.uuid)}>
            <i className={`bx ${is_in_talents_pool ? "bx-check" : "bx-plus"} text-2xl`}></i>
          </Button>
        </div>
      </div>
      <div className="grid gap-2 mb-2 w-screen mt-1">
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {employee.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="rounded-full whitespace-nowrap">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      <div className="px-4 mt-4">
        <div className="flex flex-wrap gap-2">
          {employee.languages.map((language) => (
            <Badge key={language.name} variant="outline">
              {language.name}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm mb-2 mt-2">
          <div className="font-bold">
            {l10n("Minimal Salary")}: ${employee.min_salary.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
