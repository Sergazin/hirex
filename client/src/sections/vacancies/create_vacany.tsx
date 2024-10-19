import { ThinTopBar } from "@/components/thin_top_bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Language, VacancyPublic } from "@/ts_client";
import { useNavigate } from "@tanstack/react-router";
import _ from "lodash";
import React from "react";
import { VacancyCubit } from "./cubit";
import Swal from "sweetalert2";
import { l10n } from "@/l10n";

export type VacancyRaw = {
  uuid: string;
  name: string;
  description: string;
  skills: string[];
  languages: Language[];
  min_salary: number;
  min_experience: number;
  user_uuid: string;
  is_sample: boolean;
};

const CreateVacancyScreen: React.FC<{}> = ($) => {
  const nav = useNavigate();

  const [form, set_form] = React.useState<VacancyPublic>({
    name: "",
    description: "",
    skills: [],
    languages: [],
    min_salary: 0,
    min_experience: 0,
    user_uuid: "",
    is_sample: false,
  });

  const set_skills = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    set_form((prev) => ({ ...prev, skills }));
  };

  return (
    <div>
      <ThinTopBar
        title={l10n("Create Vacancy")}
        actions={
          <div className="flex  gap-4">
            <Button variant="ghost" size="icon" onClick={() => nav({ to: "/" })}>
              <i className="bx bx-x text-2xl"></i>
            </Button>
          </div>
        }
      />
      <div className="p-4 bg-background shadow-md rounded-lg flex flex-col gap-4">
        {l10n("Create vacancy or use AI assistant")}
        <div>
          <Label htmlFor="name">{l10n("Name")}</Label>
          <Input
            id="name"
            type="text"
            placeholder={l10n("ex: React Developer")}
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={form.name}
            onChange={(e) => set_form({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="description">{l10n("Description")}</Label>
          <textarea
            id="description"
            placeholder={l10n("ex: We are looking for a React Developer to join our team...")}
            className="w-full bg-background border border-gray-300 rounded-md p-2"
            defaultValue={form.description}
            onChange={(e) => set_form({ ...form, description: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skills">{l10n("Skills (comma-separated)")}</Label>
          <Input
            id="skills"
            placeholder="React, TypeScript, Node.js"
            defaultValue={form.skills.join(", ")}
            onChange={set_skills}
          />
        </div>
        <div>
          <Label htmlFor="min_salary">{l10n("Minimum Salary")}</Label>
          <Input
            id="min_salary"
            type="number"
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={form.min_salary}
            onChange={(e) => set_form({ ...form, min_salary: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <Label htmlFor="min_experience">{l10n("Minimum Experience")}</Label>
          <Input
            id="min_experience"
            type="number"
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={form.min_experience}
            onChange={(e) => set_form({ ...form, min_experience: parseInt(e.target.value) })}
          />
          <div className="flex gap-2 w-full fixed bottom-0 left-0 p-2">
            <Button variant="outline" onClick={() => nav({ to: "/vacancies" })} className="grow">
              Cancel
            </Button>

            <Button
              className="grow"
              onClick={async () => {
                await VacancyCubit.create_vacancy(form);
                Swal.fire(l10n("Vacancy created"), "", "success");
                nav({ to: "/vacancies" });
              }}
              disabled={!form.name || !form.description || form.skills.length === 0}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVacancyScreen;
