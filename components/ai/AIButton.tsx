"use client";

import { useIsChatBotOpenStore } from "@/stores";
import { Bot } from "lucide-react";
import { Button } from "../ui/button";

export default function AIButton() {
  const isChatBotOpen = useIsChatBotOpenStore((state) => state.isChatBotOpen);
  const setIsChatBotOpen = useIsChatBotOpenStore(
    (state) => state.setIsChatBotOpen
  );

  return (
    <div>
      <Button
        className="w-1 h-7 bg-blue-500 hover:bg-blue-600"
        variant="secondary"
        onClick={() => setIsChatBotOpen(!isChatBotOpen)}
      >
        <Bot />
      </Button>
    </div>
  );
}
