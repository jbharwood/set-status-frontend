"use client";

import { useEffect } from "react";
import { BotCard } from "@/components/index";
import { useSelectedStageIDStore, useSocketStore } from "@/stores";

type AINavigationProps = {
  stageId: number;
  stageName: string;
};

export default function AINavigation({
  stageId,
  stageName,
}: AINavigationProps) {
  const setSelectedStageID = useSelectedStageIDStore(
    (state) => state.setSelectedStageID
  );
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    socket?.emit("leave_room", selectedStageID);
    setSelectedStageID(stageId);
  }, [stageId, setSelectedStageID]);

  return <BotCard>Opened {stageName}</BotCard>;
}
