import { create } from "zustand";

type State = {
  voiceText: string;
};

type Action = {
  setVoiceText: (voiceText: State["voiceText"]) => void;
};

const useVoiceTextStore = create<State & Action>((set) => ({
  voiceText: "",
  setVoiceText: (voiceText) => set({ voiceText }),
}));

export default useVoiceTextStore;
