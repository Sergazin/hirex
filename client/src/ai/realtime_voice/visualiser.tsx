import React, { useEffect, useRef } from "react";
import * as Connector from "./connector";
import { WavRenderer } from "./wav_renderer";

export const VisualiserWidget: React.FC = () => {
  const clientCanvasRef = useRef<HTMLCanvasElement>(null);
  const serverCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isLoaded = true;

    const recorder = Connector.recorder;
    const user_canvas = clientCanvasRef.current;
    let clientCtx: CanvasRenderingContext2D | null = null;

    const player = Connector.player;
    const ai_canvas = serverCanvasRef.current;
    let serverCtx: CanvasRenderingContext2D | null = null;

    const size = {
      width: 1000,
      height: 200,
    };

    const render = () => {
      if (isLoaded) {
        if (user_canvas) {
          user_canvas.width = size.width;
          user_canvas.height = size.height;
          clientCtx = clientCtx || user_canvas.getContext("2d");
          if (clientCtx) {
            clientCtx.clearRect(0, 0, user_canvas.width, user_canvas.height);
            const result = recorder.recording ? recorder.getFrequencies("voice") : { values: new Float32Array([0]) };
            WavRenderer.drawBars(user_canvas, clientCtx, result.values, "#0099ff", 72, 0, 0);
          }
        }
        if (ai_canvas) {
          ai_canvas.width = size.width;
          ai_canvas.height = size.height;
          serverCtx = serverCtx || ai_canvas.getContext("2d");
          if (serverCtx) {
            serverCtx.clearRect(0, 0, ai_canvas.width, ai_canvas.height);
            const result = player.analyser ? player.getFrequencies("voice") : { values: new Float32Array([0]) };
            WavRenderer.drawBars(ai_canvas, serverCtx, result.values, "#009900", 72, 0, 0);
          }
        }
        window.requestAnimationFrame(render);
      }
    };
    render();

    return () => {
      isLoaded = false;
    };
  }, []);
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full h-18 z-10">
        <canvas ref={clientCanvasRef} className="w-full h-full" />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-18 z-10">
        <canvas ref={serverCanvasRef} className="w-full h-full" />
      </div>
    </>
  );
};
