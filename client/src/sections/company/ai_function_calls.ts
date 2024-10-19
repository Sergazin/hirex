import { LanguageEnum } from "@/ts_client";
import { skills } from "@/samples/get_random_sets";
import { AICompleter } from "@/ai/completions";
import { ChatCompletionTool } from "openai/resources/index.mjs";
import { EmployeeSearchCubit } from "./cubit";

export const employee_search_filter_tools: ChatCompletionTool = {
  type: "function",
  function: {
    name: "search_employee_by_filter",
    description:
      "Search employees by Filters: skills, min experience (years), min and max salary and languages spoken. All fields are optional.",
    strict: true,
    parameters: {
      type: "object",
      required: ["skills", "languages", "min_salary", "max_salary", "min_experience_years"],
      additionalProperties: false,
      properties: {
        skills: {
          type: "array",
          items: {
            type: "string",
            enum: skills,
          },
          description: "List of required skills. Default is empty",
        },
        languages: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              name: {
                type: "string",
                enum: Object.values(LanguageEnum),
              },
            },
            required: ["name"],
          },
          description: "List of languages required. Default is empty",
        },
        min_salary: {
          type: "number",
          description: "Minimum salary expectation. Default is 0",
        },
        max_salary: {
          type: "number",
          description: "Maximum salary range. Default is 0",
        },
        min_experience_years: {
          type: "number",
          description: "Minimum years of experience. Default is 0",
        },
      },
    },
  },
};

AICompleter.add_tool(employee_search_filter_tools, async (payload: any) => {
  console.log(payload);
  await EmployeeSearchCubit.set_filter(payload);
  const employees = EmployeeSearchCubit.state.get().employees.slice(0, 3);
  const found = employees.map((e) => ({ name: e.name, surname: e.surname }));
  console.log(found);
  return found;
});

//AIConnector.add_tool(employee_search_filter_tools);
/*
AIConnector.client.addTool(employee_search_filter_tools, async (payload: any) => {
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
