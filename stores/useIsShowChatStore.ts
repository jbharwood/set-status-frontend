import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  isShowChat: boolean
}

type Action = {
  setIsShowChat: (isShowChat: State['isShowChat']) => void
}

const useIsShowChatStore = create<State & Action, [["zustand/persist", Partial<State & Action>]]>(
  persist<State & Action>(
    (set) => ({
      isShowChat: true,
      setIsShowChat: (isShowChat) => set({ isShowChat }),
    }),
    {
      name: 'is-show-chat-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isShowChat = state.isShowChat ?? true;
        }
      },
    }
  )
);

export default useIsShowChatStore;