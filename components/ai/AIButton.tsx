"use client";

import { useIsChatBotOpenStore } from "@/stores";
import { Bot } from "lucide-react";
import ButtonWithTooltip from "@/components/ButtonWithTooltip";

export default function AIButton() {
  const isChatBotOpen = useIsChatBotOpenStore((state) => state.isChatBotOpen);
  const setIsChatBotOpen = useIsChatBotOpenStore(
    (state) => state.setIsChatBotOpen
  );

  return (
    <div>
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
