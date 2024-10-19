import CreateVacancyScreen from "@/sections/vacancies/create_vacany";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-vacancy")({
  component: CreateVacancyScreen,
});
