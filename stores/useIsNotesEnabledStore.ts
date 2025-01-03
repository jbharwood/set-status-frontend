import { create } from 'zustand'

type State = {
  isNotesEnabled: boolean
}

type Action = {
  setIsNotesEnabled: (isNotesEnabled: State['isNotesEnabled']) => void
}

const useIsNotesEnabledStore = create<State & Action>((set) => ({
  isNotesEnabled: false,
  setIsNotesEnabled: (isNotesEnabled) => set({ isNotesEnabled }),
}));

export default useIsNotesEnabledStore;