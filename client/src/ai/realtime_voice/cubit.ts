import * as nanostores from "nanostores";
//import * as Connector from "./connector";
import { AICompleter } from "@/ai/completions";

const state = nanostores.map<{
  inited: boolean;
  loading: boolean;
  recording: boolean;
}>({
  loading: false,
  recording: false,
  inited: false,
});

export class RealtimeVoiceCubit {
  static state = state;

  static async start() {
    const $ = state.get();
    if (!$.inited) {
      state.setKey("loading", true);
      //await Connector.init();
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
    if (!$.recording || $.loading || !$.inited) return;
    state.setKey("recording", false);
    AICompleter.end_speech();
    //Connector.stop();
  }

  static async toggle() {
    const $ = state.get();
    if ($.recording) await this.stop();
    else await this.start();
  }
}
