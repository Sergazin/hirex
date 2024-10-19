import { ThinTopBar } from "@/components/thin_top_bar";
import { Button } from "@/components/ui/button";
import { useStore } from "@nanostores/react";
import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { VacancyCubit } from "./cubit";
import VacancyCard from "./vacancy_cart";
import {l10n} from "@/l10n";

export const VacanciesScreen: React.FC = () => {
  const nav = useNavigate();
  const state = useStore(VacancyCubit.state);
  return (
    <div>
      <ThinTopBar
        title={l10n("My Vacancies")}
        actions={
          <div className="flex  gap-4">
            <Button variant="ghost" size="icon" onClick={() => nav({ to: "/" })}>
              <i className="bx bx-x text-2xl"></i>
            </Button>
          </div>
        }
      />

      <div className="p-4">
        <Button className="w-full" onClick={() => nav({ to: "/create-vacancy" })}>
          {l10n("Create Vacancy, or use AI assistant")}
        </Button>
      </div>
      {state.vacancies.length === 0 && (
        <div className="text-center h-[80vh] flex items-center justify-center flex-col">
          <i className="bx bx-user-x text-7xl text-muted-foreground"></i>
          {l10n("No vacancies")}
        </div>
      )}
      <div className="flex flex-wrap gap-4 p-4">
        {state.vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.uuid} vacancy={vacancy} />
        ))}
      </div>
    </div>
  );
};
