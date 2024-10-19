import * as nanostores from "nanostores";
//import * as Connector from "./connector";
import { AICompleter } from "@/ai/completions";
//import { l10n } from "@/l10n";

const state = nanostores.map<{
  inited: boolean;
  loading: boolean;
  recording: boolean;
  response: string;
}>({
  loading: false,
  recording: false,
  inited: false,
  response: "",
});

export class RealtimeVoiceCubit {
  static state = state;

  static async start() {
    const $ = state.get();
    if (!$.inited) {
      state.setKey("loading", true);
      try {
        await AICompleter.init();
      } catch (e) {
        throw e;
      } finally {
        state.setKey("loading", false);
      }
      state.setKey("inited", true);
      state.setKey("loading", false);
    } else {
      state.setKey("recording", true);
      AICompleter.start_speech();
      //Connector.start();
    }
  }
  static async stop() {
    const $ = state.get();
    if (!$.recording || !$.inited) return;
    state.setKey("recording", false);
    state.setKey("loading", true);
    // AICompleter.text_to_speech(l10n("Got it!, Let me think..."));
    await AICompleter.end_speech();
    state.setKey("loading", false);

    //Connector.stop();
  }

  static async toggle() {
    const $ = state.get();
    if ($.recording) await this.stop();
    else await this.start();
  }

  static async show_response(text: string) {
  }
}
