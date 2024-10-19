import { createFileRoute } from "@tanstack/react-router";
import { AppCubit, UserViewMode } from "@/cubits/app_cubit";
import WelcomeScreen from "@/sections/welcomer";
import { useStore } from "@nanostores/react";
import CompanyScreen from "@/sections/company";
import EmployeeScreen from "@/sections/employee";

//window.Telegram.WebApp.BackButton

window.Telegram.WebApp.BackButton.onClick(() => {
  alert("back");
});

function Index() {
  const app_state = useStore(AppCubit.state);
  if (app_state.user_view_mode === UserViewMode.WELCOMER) return <WelcomeScreen />;
  return <>{app_state.user_view_mode === UserViewMode.COMPANY ? <CompanyScreen /> : <EmployeeScreen />}</>;
}

export const Route = createFileRoute("/")({
  component: Index,
});
//{telegram_init_date_string_to_object(window.Telegram.WebApp.initData).user.first_name}
