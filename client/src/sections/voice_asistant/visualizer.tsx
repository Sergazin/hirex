import { LiveAudioVisualizer } from "react-audio-visualize";
import { AICompleter } from "../../ai/completions";
import { useStore } from "@nanostores/react";
import { RealtimeVoiceCubit } from "./cubit";
import { useEffect, useState } from "react";

export const VisualizerWidget = () => {
  const state = useStore(RealtimeVoiceCubit.state);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  useEffect(() => {
    if (AICompleter.recorder) {
      setMediaRecorder(AICompleter.recorder);
    }
  }, [state]);

  if (!AICompleter.recorder) return null;
  return (
    <div className="bg-red-500">
      {mediaRecorder && <LiveAudioVisualizer mediaRecorder={mediaRecorder} width={200} height={75} />}
    </div>
  );
};
