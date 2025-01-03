import { create } from 'zustand';

type State = {
  notifyModalEvent: {
    eventName: string;
    eventPrompt: string;
    cb: () => void;
  };
};

type Action = {
  setNotifyModalEvent: (notifyModalEvent: State['notifyModalEvent']) => void;
};

const useNotifyModalEventStore = create<State & Action>((set) => ({
  notifyModalEvent: {
    eventName: '',
    eventPrompt: '',
    cb: () => {},
  },
  setNotifyModalEvent: (notifyModalEvent) => set({ notifyModalEvent }),
}));

export default useNotifyModalEventStore;
