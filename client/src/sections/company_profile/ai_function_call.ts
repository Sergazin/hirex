import { AICompleter } from "@/ai/completions";
import { ChatCompletionTool } from "openai/resources/index.mjs";
import { CompanyProfileCubit } from "./cubit";
import { CompanyProfilePublic } from "@/ts_client";

export const update_company_profile: ChatCompletionTool = {
  type: "function",
  function: {
    name: "update_company_profile",
    description: "Update my company profile. All fields are optional.",
    strict: true,
    parameters: {
      type: "object",
      required: ["name", "description", "bin"],
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
          description: "Company name. Default is empty",
        },
        description: {
          type: "string",
          description: "Company description. Default is empty",
        },
        bin: {
          type: "string",
          description: "Company BIN. Default is empty",
        },
      },
    },
  },
};

AICompleter.add_tool(update_company_profile, async (payload: Partial<CompanyProfilePublic>) => {
  const filtered_payload = Object.fromEntries(Object.entries(payload).filter(([_key, value]: any) => !!value));
  await CompanyProfileCubit.save_company_profile(filtered_payload);
});

//AIConnector.add_tool(update_company_profile);
/*
AIConnector.client.addTool(update_company_profile, async (payload: any) => {
  console.log(payload);
  await EmployeeSearchCubit.set_filter(payload);
  const employees = EmployeeSearchCubit.state.get().employees.slice(0, 3);
  const found = employees.map((e) => ({ name: e.name, surname: e.surname }));
  console.log(found);
  return found;
});
* **/
/*
type Item = {
  id: "item_AJx54CtEJbl1Ma27BRAKK";
  object: "realtime.item";
  type: "function_call";
  status: "completed";
  name: "search_employee_by_filter";
  call_id: "call_76tTNGpoNZeDepEM";
  arguments: '{"skills":["Node.js"]}';
  formatted: {
    audio: {};
    text: "";
    transcript: "";
    tool: {
      type: "function";
      name: "search_employee_by_filter";
      call_id: "call_76tTNGpoNZeDepEM";
      arguments: '{"skills":["Node.js"]}';
    };
  };
};
* **/

/*
AIConnector.client.on("conversation.item.completed", ({ item }: { item: Item }) => {
  if (item.type === "function_call") {
    if (item.name === "search_employee_by_filter") {
      EmployeeSearchCubit.set_filter(JSON.parse(item.arguments));
    }
  }
});
* **/
