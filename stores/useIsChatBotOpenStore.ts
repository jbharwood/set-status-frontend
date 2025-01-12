import { create } from "zustand";

type State = {
  isChatBotOpen: boolean;
};

type Action = {
  setIsChatBotOpen: (isChatBotOpen: State["isChatBotOpen"]) => void;
};

const useIsChatBotOpenStore = create<State & Action>((set) => ({
  isChatBotOpen: false,
  setIsChatBotOpen: (isChatBotOpen) => set({ isChatBotOpen }),
}));

export default useIsChatBotOpenStore;
