import { VoiceAssistantWidget } from "@/sections/voice_asistant";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <VoiceAssistantWidget />
        <Toaster duration={10000} position="top-center" className="mt-12" />
      </>
    );
  },
});
