import TalentsPoolScreen from "@/sections/talent_pool";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/talent-pool")({
  component: TalentsPoolScreen,
});
