import React from "react";
import { useStore } from "@nanostores/react";
import { RealtimeVoiceCubit } from "./cubit";
import { VisualiserWidget } from "./visualiser";
import { l10n } from "@/l10n";
import { toast } from "sonner";

export const RealtimeVoiceWidget: React.FC = () => {
  const state = useStore(RealtimeVoiceCubit.state);
  const { start, stop } = RealtimeVoiceCubit;

  const toast_start = async () => {
    let inited = !!state.inited;
    await start();
    if (!inited) toast(l10n("Use Push-To-Talk button to command the assistant"));
  };

  return (
    <>
      <div>
        <button
          className={
            "fixed bottom-4 right-4 rounded-full w-24 h-24 z-20 text-5xl text-white border-4 flex items-center justify-center transition bg-gradient-to-r font-bold  " +
            (state.inited
              ? state.recording
                ? " from-green-500 to-blue-500 "
                : " from-violet-500 to-blue-500 "
              : " from-gray-500 to-gray-700 ")
          }
          onTouchStart={toast_start}
          onTouchEnd={stop}
          onMouseDown={toast_start}
          onMouseUp={stop}
        >
          <i
            className={
              "bx " +
              (state.loading
                ? " bx-loader animate-spin "
                : " " + (state.recording ? " animate-pulse bxs-microphone  " : " bx-microphone "))
            }
          ></i>
        </button>
      </div>
      <VisualiserWidget />
    </>
  );
};
