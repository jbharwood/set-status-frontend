import { create } from 'zustand';

type State = {
  isWebView: boolean
}

type Action = {
  setIsWebView: (isWebView: State['isWebView']) => void
}

const useIsWebViewStore = create<State & Action>((set) => ({
  isWebView: true,
  setIsWebView: (isWebView) => set({ isWebView }),
}));

export default useIsWebViewStore;