import { ThinTopBar } from "@/components/thin_top_bar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { UserProfileIconWidget } from "../user_profile/user_profile_icon";
import {l10n} from "@/l10n";

const EmployeeScreen: React.FC = () => {
  return (
    <div className="">
      <ThinTopBar
        title="Vacanies"
        actions={
          <div className="flex  gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <i className="bx bx-sort-alt-2"></i>
                  {l10n("Filters")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent></DropdownMenuContent>
            </DropdownMenu>
            <UserProfileIconWidget />
          </div>
        }
      />
    </div>
  );
};

export default EmployeeScreen;
