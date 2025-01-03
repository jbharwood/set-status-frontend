import { create } from 'zustand'

type State = {
  isShowChat: boolean
}

type Action = {
  setIsShowChat: (isShowChat: State['isShowChat']) => void
}

const useIsShowChatStore = create<State & Action>((set) => ({
  isShowChat: true,
  setIsShowChat: (isShowChat) => set({ isShowChat }),
}));

export default useIsShowChatStore;