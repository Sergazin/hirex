// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// ==================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Type
// ==================================================================================
// Generated at: Sat, 19 Oct 2024 12:58:01 +0000
import type { Language } from '../types/language';
import type { EmployeeStatus } from '../types/employee_status';
import type { GeoCoords } from '../types/geo_coords';
// ===============================================================
export type EmployeeSearchFilter = { statuses: EmployeeStatus[];
skills: string[];
languages: Language[];
geocoords: GeoCoords;
radius: number;
min_salary: number;
max_salary: number;
min_experience_years: number;
 };
