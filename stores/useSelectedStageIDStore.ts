import { create } from 'zustand'

type State = {
  selectedStageID: number | null
}

type Action = {
  setSelectedStageID: (selectedStage: State['selectedStageID']) => void
}

const useSelectedStageIDStore = create<State & Action>((set) => ({
  selectedStageID: null,
  setSelectedStageID: (selectedStageID) => set({ selectedStageID }),
}));

export default useSelectedStageIDStore;