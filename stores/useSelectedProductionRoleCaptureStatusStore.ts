import { IProductionRoleCaptureStatus } from '@/types/interfaces'
import { create } from 'zustand'

type State = {
  selectedProductionRoleCaptureStatus: IProductionRoleCaptureStatus | null
}

type Action = {
  setSelectedProductionRoleCaptureStatus: (selectedProductionRoleCaptureStatus: State['selectedProductionRoleCaptureStatus']) => void
}

const useSelectedProductionRoleCaptureStatusStore = create<State & Action>((set) => ({
  selectedProductionRoleCaptureStatus: null,
  setSelectedProductionRoleCaptureStatus: (selectedProductionRoleCaptureStatus) => set({ selectedProductionRoleCaptureStatus }),
}));

export default useSelectedProductionRoleCaptureStatusStore;