"use client";

import { useIsWebViewStore, useIsChatBotOpenStore } from "@/stores";
import { Bot } from "lucide-react";
import ButtonWithTooltip from "../ButtonWithTooltip";

export default function AIButton() {
  const isWebView = useIsWebViewStore((state) => state.isWebView);
  const isChatBotOpen = useIsChatBotOpenStore((state) => state.isChatBotOpen);
  const setIsChatBotOpen = useIsChatBotOpenStore(
    (state) => state.setIsChatBotOpen
  );

  return (
    <div
      className={`${!isWebView ? "hidden-in-fullscreen" : ""} fixed top-[7.5px] right-3 lg:right-4 xl:right-4 z-[1000]`}
    >
      <ButtonWithTooltip
        icon={Bot}
        tooltipText="Ask AI"
        className="w-1 h-7"
        variant="secondary"
        onClick={() => setIsChatBotOpen(!isChatBotOpen)}
      />
    </div>
  );
}
