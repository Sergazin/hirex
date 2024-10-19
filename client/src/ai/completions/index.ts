import { CONFIG } from "@/config";
import { l10n } from "@/l10n";
import OpenAI from "openai";
import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/index.mjs";
import { toast } from "sonner";

const client = new OpenAI({
  apiKey: "nonono",
  baseURL: location.origin + "/api/ai-proxy/v1",
  dangerouslyAllowBrowser: true,
});

export class AICompleter {
  static recorder: MediaRecorder | null = null;
  static audio_chunks: Blob[] = [];
  static player: HTMLAudioElement | null = null;
  static mime_type: string = MediaRecorder.isTypeSupported("audio/wav")
    ? "audio/wav"
    : MediaRecorder.isTypeSupported("audio/ogg")
      ? "audio/ogg"
      : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mpeg")
          ? "audio/mpeg"
          : MediaRecorder.isTypeSupported("video/mp4")
            ? "video/mp4"
            : "unknown";

  static messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: l10n(
        "You are ai assistant on HR application. You can filter employees by skills, min experience (years), min and max salary and languages spoken. Use the tool below to filter employees.",
      ),
    },
  ];

  static tools: ChatCompletionTool[] = [];
  static handlers: Record<string, (payload: any) => void> = {};

  static async init() {
    //alert(this.mime_type);
    const stream = await this.get_mic_access();

    if (!stream) throw new Error("Microphone access denied.");
    if (!this.recorder) {
      this.recorder = new MediaRecorder(stream, {
        mimeType: this.mime_type,
      });
    }
    if (!this.player) {
      this.player = new Audio();
      this.player.volume = 1;
      this.player.autoplay = true;
      this.player.controls = true;
    }
  }

  static add_tool(tool: ChatCompletionTool, handler: (payload: any) => void) {
    this.tools.push(tool);
    this.handlers[tool.function.name] = handler;
  }

  static async text_to_speech(text: string) {
    const resp = await client.audio.speech.create({
      model: "tts-1",
      input: text,
      voice: "nova",
      response_format: "mp3",
    });
    const audio = await resp.arrayBuffer();
    this.play_audio(audio);
  }

  static play_audio(audio: ArrayBuffer) {
    const blob = new Blob([audio], { type: this.mime_type });
    const url = URL.createObjectURL(blob);

    if (!this.player) return;

    this.player.src = url;
    this.player.load();
    this.player.play();
  }

  static async request(content: string) {
    const resp = await client.chat.completions.create({
      messages: [...this.messages, { role: "user", content }],
      tools: this.tools,
      model: "gpt-4o",
    });

    const message = resp.choices[0].message;
    if (message.tool_calls) {
      for (const call of message.tool_calls) {
        this.handlers[call.function.name](JSON.parse(call.function.arguments));
      }
    } else if (message.content) {
      toast(message.content);
      await this.text_to_speech(message.content);
    }
  }

  static async transcript(blob: Blob) {
    const file = new File([blob], "test.wav", { type: this.mime_type });
    const { text } = await client.audio.transcriptions.create({
      model: "whisper-1",
      file,
    });
    await this.request(text);
  }

  static async start_speech() {
    if (!this.recorder) return;

    this.player?.pause();
    // On data available, store the recorded chunks
    this.recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audio_chunks.push(event.data);
      }
    };

    // Start the recording process
    this.recorder.start(1000);

    console.log("Recording started...");
  }
  static end_speech() {
    return new Promise((resolve) => {
      if (!this.recorder) return;
      this.recorder.stop();
      console.log("Recording stopped.");
      // Combine the audio chunks into a single blob
      this.recorder.onstop = () => {
        const audio_blob = new Blob(this.audio_chunks, { type: this.mime_type });
        if (CONFIG.AI_ENABLED) {
          this.transcript(audio_blob).then(() => {
            resolve(0);
          });
        }
        this.audio_chunks = [];
        console.log("Recording ready for playback.");
      };
    });
  }

  static async get_mic_access() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      return stream;
    } catch (err) {
      console.error("Microphone access denied or error:", err);
      return null;
    }
  }
}
