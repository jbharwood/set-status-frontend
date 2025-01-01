import { create } from 'zustand'
import { CaptureStatus } from '@/types/interfaces'

type State = {
  selectedCaptureStatus: CaptureStatus | null
}

type Action = {
  setSelectedCaptureStatus: (selectedCaptureStatus: State['selectedCaptureStatus']) => void
}

const useSelectedCaptureStatusStore = create<State & Action>((set) => ({
  selectedCaptureStatus: null,
  setSelectedCaptureStatus: (selectedCaptureStatus) => set({ selectedCaptureStatus }),
}));

export default useSelectedCaptureStatusStore;
