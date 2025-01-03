import { create } from 'zustand';

type State = {
  isEditMode: boolean;
};

type Action = {
  setIsEditMode: (isEditMode: State['isEditMode']) => void;
};

const useIsEditModeStore = create<State & Action>((set) => ({
  isEditMode: true,
  setIsEditMode: (isEditMode) => set({ isEditMode }),
}));

export default useIsEditModeStore;
