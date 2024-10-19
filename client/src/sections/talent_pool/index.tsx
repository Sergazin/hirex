import { ThinTopBar } from "@/components/thin_top_bar";
import { useStore } from "@nanostores/react";
import { EmployeeItem } from "../company/employee_card";
import { TalentsPoolCubit } from "./cubit";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {l10n} from "@/l10n";

export default function TalentsPoolScreen() {
  const state = useStore(TalentsPoolCubit.state);
  const nav = useNavigate();

  return (
    <div className="">
      <ThinTopBar
        title={l10n("Talent's Pool")}
        actions={
          <div className="flex  gap-4">
            <Button variant="ghost" size="icon" onClick={() => nav({ to: "/" })}>
              <i className="bx bx-x text-2xl"></i>
            </Button>
          </div>
        }
      />
      <div className="grid gap-4 pt-4">
        {state.talents_pool.employees.length === 0 && (
          <div className="text-center h-[80vh] flex items-center justify-center flex-col">
            <i className="bx bx-user-x text-7xl text-muted-foreground"></i>
            {l10n("No employees in the talent's pool")}
          </div>
        )}
        {state.talents_pool.employees.map((employee) => (
          <EmployeeItem key={employee.uuid} employee={employee} />
        ))}
      </div>
    </div>
  );
}
