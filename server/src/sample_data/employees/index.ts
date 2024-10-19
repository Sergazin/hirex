import { EmployeeProfileRaw, EmployeeStatusEnum } from "@/ts_server";
import { get_random_person } from "./get_random_person";
import { get_random_sets } from "./get_random_sets";
import { v4 } from "uuid";

export function employee_generator(qty: number, user_uuid: string): EmployeeProfileRaw[] {
  const employees: EmployeeProfileRaw[] = [];
  for (let i = 0; i < qty; i++) {
    const person = get_random_person();
    const sets = get_random_sets();
    const uuid = v4();
    const employee: EmployeeProfileRaw = {
      ...person,
      ...sets,
      photo: {
        url: "https://i.pravatar.cc/150?u=" + uuid,
      },
      uuid,
      education_history: [],
      employment_history: [],
      min_salary: Math.floor(Math.random() * 10000),
      // Randomly select a number between 2000 and 2020
      experience_since: new Date(
        2000 + Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ).getTime(),
      user_uuid,
      status: {
        // Random select enum
        name: Object.values(EmployeeStatusEnum)[
          Math.floor(Math.random() * Object.values(EmployeeStatusEnum).length)
        ],
      },
      is_sample: true,
    };
    employees.push(employee);
  }
  return employees;
}
