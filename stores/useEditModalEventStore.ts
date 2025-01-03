import { CaptureStatus, IProductionRoleCaptureStatus } from '@/types/interfaces';
import { create } from 'zustand';

type State = {
  editModalEvent: {
    productionRoleCaptureStatus: IProductionRoleCaptureStatus | null;
    captureStatus: CaptureStatus;
    cb: (prcs: IProductionRoleCaptureStatus | null) => void;
  };
};

type Action = {
  setEditModalEvent: (editModalEvent: State['editModalEvent']) => void;
};

const useEditModalEventStore = create<State & Action>((set) => ({
  editModalEvent: {
    productionRoleCaptureStatus: null,
    captureStatus: null,
    cb: () => {},
  },
  setEditModalEvent: (editModalEvent) => set({ editModalEvent }),
}));

export default useEditModalEventStore;
