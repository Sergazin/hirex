import { EmployeeProfileResolved, EmployeeStatusEnum } from "@/ts_client";
import { get_random_person } from "./get_random_person";
import { get_random_sets } from "./get_random_sets";

export function employee_generator(qty: number): EmployeeProfileResolved[] {
  const employees: EmployeeProfileResolved[] = [];
  for (let i = 0; i < qty; i++) {
    const person = get_random_person();
    const sets = get_random_sets();
    const uuid = random_uuid();
    const employee: EmployeeProfileResolved = {
      ...person,
      ...sets,
      photo: {
        url: "https://i.pravatar.cc/150?u=" + uuid,
      },
      uuid,
      education_history: [],
      employment_history: [],
      min_salary: Math.floor(Math.random() * 1000000),
      // Randomly select a number between 2000 and 2020
      experience_since: new Date(
        2000 + Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28),
      ).getTime(),
      user_uuid: random_uuid(),
      status: {
        // Random select enum
        name: Object.values(EmployeeStatusEnum)[
          Math.floor(Math.random() * Object.values(EmployeeStatusEnum).length)
        ],
      },
    };
    employees.push(employee);
  }
  return employees;
}

// UUID format: 00000000-0000-0000-0000-000000000000
export function random_uuid() {
  return "00000000-0000-0000-0000-000000000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
}
