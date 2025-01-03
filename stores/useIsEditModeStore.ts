import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

type State = {
  isEditMode: boolean
}

type Action = {
  setIsEditMode: (isEditMode: State['isEditMode']) => void
}

const useIsEditModeStore = create<State & Action, [["zustand/persist", Partial<State & Action>]]>(
  persist<State & Action>(
    (set) => ({
      isEditMode: true,
      setIsEditMode: (isEditMode) => set({ isEditMode }),
    }),
    {
      name: 'is-edit-mode-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isEditMode = state.isEditMode ?? true;
        }
      },
    }
  )
);

export default useIsEditModeStore;
