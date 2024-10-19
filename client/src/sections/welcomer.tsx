import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import { Lang, l10n } from "@/l10n";
import { AppCubit, UserViewMode } from "@/cubits/app_cubit";

export default function WelcomeScreen() {
  const app_state = useStore(AppCubit.state);

  return (
    <div className="min-h-screen bg-background from-blue-400 to-purple-500 flex flex-col items-center justify-center p-4 text-white">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center h-24 flex items-center justify-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {l10n("Welcome to HiReX!")}
      </motion.h1>

      <motion.div
        className="space-y-4 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button
          className="w-full bg-white text-blue-500 rounded-full py-3 px-6 font-semibold text-lg shadow-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105"
          onClick={() => AppCubit.set_user_view_mode(UserViewMode.EMPLOYEE)}
        >
          🔍 {l10n("I'm looking for a job")}
        </button>
        <button
          className="w-full bg-white text-purple-500 rounded-full py-3 px-6 font-semibold text-lg shadow-lg hover:bg-purple-100 transition duration-300 transform hover:scale-105"
          onClick={() => AppCubit.set_user_view_mode(UserViewMode.COMPANY)}
        >
          💼 {l10n("I want to hire")}
        </button>
      </motion.div>

      <motion.div
        className="mt-8 flex justify-center space-x-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {Object.entries(lang_presentations).map(([l, { flag, name }]) => (
          <button
            key={l}
            className={`text-2xl p-2 rounded ${l === app_state.lang ? "bg-white bg-opacity-20" : ""}`}
            onClick={() => AppCubit.set_lang(l as any)}
          >
            <div role="img" aria-label={name} title={name} className="rounded overflow-hidden">
              <img src={flag} alt={name} className="w-12" />
            </div>
          </button>
        ))}
      </motion.div>
    </div>
  );
}

const lang_presentations: { [key in Lang]: { name: string; flag: string } } = {
  en: {
    name: "English",
    flag: "/assets/flags/gb.svg",
  },
  ru: {
    name: "Русский",
    flag: "/assets/flags/ru.svg",
  },
  kz: {
    name: "Қазақша",
    flag: "/assets/flags/kz.svg",
  },
};
