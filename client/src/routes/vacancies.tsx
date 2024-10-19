import { VacanciesScreen } from "@/sections/vacancies";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vacancies")({
  component: VacanciesScreen,
});
