import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  isNotesEnabled: boolean
}

type Action = {
  setIsNotesEnabled: (isNotesEnabled: State['isNotesEnabled']) => void
}

const useIsNotesEnabledStore = create<State & Action, [["zustand/persist", Partial<State & Action>]]>(
  persist<State & Action>(
    (set) => ({
      isNotesEnabled: false,
      setIsNotesEnabled: (isNotesEnabled) => set({ isNotesEnabled }),
    }),
    {
      name: 'is-notes-enabled-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isNotesEnabled = state.isNotesEnabled ?? false;
        }
      },
    }
  )
);

export default useIsNotesEnabledStore;