import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EmployeeSearchFilter, LanguageEnum } from "@/ts_client";
import { CommandList } from "cmdk";
import { EmployeeSearchCubit, empty_filter } from "./cubit";
import { useStore } from "@nanostores/react";
import { l10n } from "@/l10n";

// Main component
export function EmployeeSearchFiltersButton() {
  const state = useStore(EmployeeSearchCubit.state);
  const [filters, set_filters] = useState<EmployeeSearchFilter>(state.filter);

  React.useEffect(() => {
    set_filters(state.filter);
  }, [state.filter]);

  const set_skills = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    set_filters((prev) => ({ ...prev, skills }));
  };

  const set_lang = (name: LanguageEnum) => {
    set_filters((prev) => ({
      ...prev,
      languages: prev.languages.find((lang) => lang.name === name)
        ? prev.languages.filter((lang) => lang.name !== name)
        : [...prev.languages, { name }],
    }));
  };

  const set_min_salary = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_filters((prev) => ({ ...prev, min_salary: parseInt(e.target.value) }));
  };

  const set_max_salary = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_filters((prev) => ({ ...prev, max_salary: parseInt(e.target.value) }));
  };

  const set_min_experience = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_filters((prev) => ({ ...prev, min_experience_years: parseInt(e.target.value) }));
  };

  return (
    <Drawer modal={true}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <i className="bx bx-sort-alt-2"></i>
          {l10n("Filters")}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[100vh]">
        <DrawerHeader className="border-b">
          <DrawerTitle>{l10n("Employee Search")}</DrawerTitle>
          <DrawerDescription className="hidden"></DrawerDescription>
        </DrawerHeader>
        <div className="p-4 overflow-y-scroll">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">{l10n("Skills (comma-separated)")}</Label>
                <Input
                  id="skills"
                  placeholder="React, TypeScript, Node.js"
                  defaultValue={filters.skills.join(", ")}
                  onChange={set_skills}
                />
              </div>
              <div className="space-y-2">
                <Label>{l10n("Languages")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {filters.languages.length > 0
                        ? filters.languages.map((v) => v.name).join(", ")
                        : l10n("Select languages")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {Object.values(LanguageEnum).map((language) => (
                            <CommandItem key={language} onSelect={() => set_lang(language as LanguageEnum)}>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  filters.languages.find((lang) => lang.name === (language as LanguageEnum))
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {language}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-2">
                <div className="space-y-2">
                  <Label htmlFor="minSalary">{l10n("Minimum Salary")}</Label>
                  <Input
                    id="minSalary"
                    defaultValue={filters.min_salary || ""}
                    type="number"
                    placeholder={l10n("Enter minimum salary")}
                    onChange={set_min_salary}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxSalary">{l10n("Maximum Salary")}</Label>
                  <Input
                    id="maxSalary"
                    defaultValue={filters.max_salary || ""}
                    type="number"
                    placeholder={l10n("Enter maximum salary")}
                    onChange={set_max_salary}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minExperience">{l10n("Minimum Years of Experience")}</Label>
                <Input
                  id="minExperience"
                  type="number"
                  defaultValue={filters.min_experience_years || ""}
                  placeholder={l10n("Enter minimum years of experience")}
                  onChange={set_min_experience}
                />
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter className="border-t">
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                set_filters(empty_filter);
              }}
            >
              {l10n("Clean")}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">{l10n("Cancel")}</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                className="w-full"
                onClick={() => {
                  EmployeeSearchCubit.set_filter(filters);
                }}
              >
                {l10n("Search Employees")}
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
