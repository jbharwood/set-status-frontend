import { create } from 'zustand';

type State = {
  isFilterModalOpen: boolean
}

type Action = {
  setIsFilterModalOpen: (isFilterModalOpen: State['isFilterModalOpen']) => void
}

const useIsFilterModalOpenStore = create<State & Action>(
  (set) => ({
    isFilterModalOpen: false,
    setIsFilterModalOpen: (isFilterModalOpen) => set({ isFilterModalOpen }),
  })
);

export default useIsFilterModalOpenStore;