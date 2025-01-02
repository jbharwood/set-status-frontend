import { create } from 'zustand'
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from 'socket.io';


type State = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}

type Action = {
  setSocket: (selectedStage: State['socket']) => void
}

const useSocketStore = create<State & Action>((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
}));

export default useSocketStore;