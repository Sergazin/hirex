import OpenAI from "openai";
import * as T from "../ts_server";
import * as M from "../ts_server/models";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set");

/*
const client = new OpenAI({
  apiKey: OPENAI_API_KEY, // This is the default and can be omitted
});
* **/
