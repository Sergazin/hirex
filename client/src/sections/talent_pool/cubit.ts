import { hirex_api } from "@/api";
import {l10n} from "@/l10n";
import { TalentsPoolResolved } from "@/ts_client";
import * as nanostores from "nanostores";
import { toast } from "sonner";
import Swal from "sweetalert2";

const state = nanostores.map<{
  talents_pool: TalentsPoolResolved;
}>({
  talents_pool: {
    uuid: "",
    employee_uuids: [],
    employees: [],
    user_uuid: "",
  },
});

const api = hirex_api;

export class TalentsPoolCubit {
  static state = state;

  static async init() {
    const talents_pool = await api.get_talents_pool();
    state.set({ talents_pool });
  }

  static async add_employee(employee_uuid: string) {
    const talents_pool = await api.add_to_talents_pool(employee_uuid);
    state.set({ talents_pool });
    toast.success(l10n("Employee added to talents pool"), { duration: 1000 });
  }

  static async remove_employee(employee_uuid: string) {
    const talents_pool = await api.remove_from_talents_pool(employee_uuid);
    state.set({ talents_pool });
  }

  static async toggle_employee(employee_uuid: string) {
    const $ = state.get();
    if ($.talents_pool.employee_uuids.includes(employee_uuid)) {
      Swal.fire({
        title: l10n("Remove from talents pool?"),
        showCancelButton: true,
        confirmButtonText: "Remove",
        confirmButtonColor: "red",
      }).then((result) => {
        if (result.isConfirmed) {
          this.remove_employee(employee_uuid);
        }
      });
    } else {
      await this.add_employee(employee_uuid);
    }
  }
}
