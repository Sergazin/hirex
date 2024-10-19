import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CONFIG } from "@/config";
import { AppCubit, UserViewMode } from "@/cubits/app_cubit";
import { AuthCubit } from "@/cubits/auth_cubit";
import { useStore } from "@nanostores/react";
import { DevMenu } from "../dev";
import { useNavigate } from "@tanstack/react-router";
import { l10n } from "@/l10n";

export function UserProfileIconWidget() {
  const nav = useNavigate();
  const auth_state = useStore(AuthCubit.state);
  const app_state = useStore(AppCubit.state);
  if (!auth_state.authorized) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <i className="bx bx-user-circle text-2xl"></i>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {l10n("My Account")}(
          {app_state.user_view_mode === UserViewMode.EMPLOYEE ? l10n("Employee") : l10n("Company")})
        </DropdownMenuLabel>
        {app_state.user_view_mode === UserViewMode.COMPANY && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                nav({ to: "/edit-company-profile" });
              }}
            >
              {l10n("Edit Company Profile")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                nav({ to: "/talent-pool" });
              }}
            >
              {l10n("My Talents Pool")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                nav({ to: "/vacancies" });
              }}
            >
              {l10n("Vacancies")}
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        {/*
        *         <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              AppCubit.set_user_view_mode(
                app_state.user_view_mode === UserViewMode.EMPLOYEE ? UserViewMode.COMPANY : UserViewMode.EMPLOYEE,
              );
            }}
          >
            {app_state.user_view_mode === UserViewMode.EMPLOYEE
              ? l10n("Switch to Company")
              : l10n("Switch to Employee")}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        * */}
        {
          <DropdownMenuItem
            onClick={() => {
              AppCubit.toggle_dark_mode();
            }}
          >
            {app_state.dark_mode ? l10n("Light Mode") : l10n("Dark Mode")}
            <DropdownMenuShortcut>
              <i className={"bx " + (app_state.dark_mode ? "bx-sun" : "bx-moon")}></i>
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        }
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {app_state.lang !== "ru" && (
            <DropdownMenuItem
              onClick={() => {
                AppCubit.set_lang("ru");
              }}
            >
              Русский
            </DropdownMenuItem>
          )}
          {app_state.lang !== "en" && (
            <DropdownMenuItem
              onClick={() => {
                AppCubit.set_lang("en");
              }}
            >
              English
            </DropdownMenuItem>
          )}
          {app_state.lang !== "kz" && (
            <DropdownMenuItem
              onClick={() => {
                AppCubit.set_lang("kz");
              }}
            >
              Қазақша
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            TelegramID
            <DropdownMenuShortcut>{auth_state.user_data.id}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {l10n("Username")}
            <DropdownMenuShortcut>{auth_state.user_data.username}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {l10n("Name")}
            <DropdownMenuShortcut>{auth_state.user_data.first_name}</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {l10n("Surname")}
            <DropdownMenuShortcut>{auth_state.user_data.last_name}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            window.Telegram.WebApp.close();
          }}
        >
          {l10n("Close App")}
          <DropdownMenuShortcut>
            <i className="bx bx-log-out"></i>
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        {CONFIG.DEV_MODE && <DevMenu />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
