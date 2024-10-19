import { RealtimeClient } from "@openai/realtime-api-beta";
import { WavRecorder, WavStreamPlayer } from "./wavtools";
import { CONFIG } from "@/config";
import { ToolDefinitionType } from "@openai/realtime-api-beta/dist/lib/client";

export const recorder = new WavRecorder({ sampleRate: 24000 });
export const player = new WavStreamPlayer({ sampleRate: 24000 });

export const client = new RealtimeClient({ url: "/api/openai-realtime-relay" });

//client.updateSession({ turn_detection: { type: "server_vad" }, });
//client.updateSession({ voice: "echo" });

client.on("error", (event: any) => console.error(event));

client.on("conversation.interrupted", async () => {
  const trackSampleOffset = player.interrupt();
  if (trackSampleOffset?.trackId) {
    const { trackId, offset } = trackSampleOffset;
    client.cancelResponse(trackId, offset);
  }
});

client.on("conversation.updated", async ({ item, delta }: any) => {
  if (delta?.audio) {
    player.add16BitPCM(delta.audio, item.id);
  }
  if (item.status === "completed" && item.formatted.audio?.length) {
    const wavFile = await WavRecorder.decode(item.formatted.audio, 24000, 24000);
    item.formatted.file = wavFile;
  }
});

const tools: ToolDefinitionType[] = [];

export function add_tool(tool: ToolDefinitionType) {
  tools.push(tool);
}

export async function init() {
  try {
    await recorder.begin();
    await player.connect();
    await client.connect();
    client.updateSession({
      tools,
      model: "gpt-3.5-turbo",
      max_response_output_tokens: 300,
      //tool_choice: "required", //{type:"function", name: "search_employee_by_filter" },
      //voice: "echo",
      modalities: ["text"],
      instructions:
        "You are ai assistant on HR application. You can filter employees by skills, min experience (years), min and max salary and languages spoken. Use the tool below to filter employees.",
    });
  } catch (e) {
    console.log(`Error initializing: `, e);
  }
}

export const start = async () => {
  const track_sample_offset = player.interrupt();
  if (track_sample_offset?.trackId) {
    const { trackId, offset } = track_sample_offset;
    client.cancelResponse(trackId, offset);
  }
  await recorder.record((data) => {
    if (CONFIG.AI_ENABLED) client.appendInputAudio(data.mono);
  });
};

export const stop = async () => {
  await recorder.pause();
  if (CONFIG.AI_ENABLED) client.createResponse();
};
