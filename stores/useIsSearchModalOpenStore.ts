import { create } from 'zustand'

type State = {
  isSearchModalOpen: boolean
}

type Action = {
  setIsSearchModalOpen: (isSearchModalOpen: State['isSearchModalOpen']) => void
}

const useIsSearchModalOpenStore = create<State & Action>((set) => ({
  isSearchModalOpen: false,
  setIsSearchModalOpen: (isSearchModalOpen) => set({ isSearchModalOpen }),
}));

export default useIsSearchModalOpenStore;