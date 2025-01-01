import { create } from 'zustand'

type State = {
  isEditModalOpen: boolean
}

type Action = {
  setIsEditModalOpen: (isEditModalOpen: State['isEditModalOpen']) => void
}

const useIsEditModalOpenStore = create<State & Action>((set) => ({
  isEditModalOpen: false,
  setIsEditModalOpen: (isEditModalOpen) => set({ isEditModalOpen }),
}));

export default useIsEditModalOpenStore;