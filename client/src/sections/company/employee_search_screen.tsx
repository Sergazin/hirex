import { EmployeeItem } from "./employee_card";
import { ThinTopBar } from "@/components/thin_top_bar";
import { UserProfileIconWidget } from "../user_profile/user_profile_icon";
import { useStore } from "@nanostores/react";
import { EmployeeSearchCubit } from "./cubit";
import { EmployeeSearchFiltersButton } from "./employee_search_filters";
import { l10n } from "@/l10n";

export default function EmployeeSearchScreen() {
  const state = useStore(EmployeeSearchCubit.state);

  return (
    <div className="">
      <ThinTopBar
        title={l10n("Employees")}
        actions={
          <div className="flex  gap-4">
            <EmployeeSearchFiltersButton />
            <UserProfileIconWidget />
          </div>
        }
      />
      <div className="grid gap-4 pt-4">
        {state.employees.length === 0 && (
          <div className="text-center h-[80vh] flex items-center justify-center flex-col">
            <i className="bx bx-user-x text-7xl text-muted-foreground"></i>
            {l10n("No employees in search results")}
          </div>
        )}
        {state.employees.map((employee) => (
          <EmployeeItem key={employee.uuid} employee={employee} />
        ))}
      </div>
    </div>
  );
}
