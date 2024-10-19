// ⚠️ WARNING: CODEGENERATION! DON'T CHANGE THIS FILE
// ==================================================================================
// Copyright © 2024 Arman Sergazin (arman@sergazin.kz). All rights reserved. TS Type
// ==================================================================================
// Generated at: Sat, 19 Oct 2024 12:58:01 +0000
import type { Language } from '../types/language';
import type { HistoryRecord } from '../types/history_record';
import type { EmployeeStatus } from '../types/employee_status';
import type { Image } from '../types/image';
import type { GeoCoords } from '../types/geo_coords';
// ===============================================================
export type EmployeeProfilePublic = { name: string;
surname: string;
iin: string;
photo: Image;
bio: string;
is_man: boolean;
birthdate: number;
status: EmployeeStatus;
skills: string[];
languages: Language[];
geocoords: GeoCoords;
education_history: HistoryRecord[];
employment_history: HistoryRecord[];
min_salary: number;
experience_since: number;
user_uuid: string;
is_sample: boolean;
 };
