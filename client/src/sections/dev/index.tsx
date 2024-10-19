import { hirex_api } from "@/api";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import React from "react";
import Swal from "sweetalert2";

export const DevMenu: React.FC = () => {
  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>DEV MENU</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                hirex_api.drop_db();
                Swal.fire("Deleted!", "Your database has been deleted. Refreshing...", "success");
                setTimeout(() => {
                  location.reload();
                }, 1000);
              }
            });
          }}
        >
          DROP DB
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
};
