"use client";

import { useIsWebViewStore } from "@/stores";
import Microphone from "@/components/Microphone";
import AIButton from "@/components/ai/AIButton";

export default function StickyContainer() {
  const isWebView = useIsWebViewStore((state) => state.isWebView);

  return (
    <div
      className={`flex gap-2 ${!isWebView ? "hidden-in-fullscreen" : ""} fixed top-[7.5px] right-3 lg:right-4 xl:right-4 z-[1000]`}
    >
      <Microphone />
      <AIButton />
    </div>
  );
}
