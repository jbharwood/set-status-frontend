"use client";

import { useEffect } from "react";
import { BotCard } from "@/components/index";
import { useSearchParams } from "next/navigation";
import useSelectedStageIDStore from "@/stores/useSelectedStageIDStore";

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
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    setSelectedStageID(stageId);
    newSearchParams.set("stage", stageId.toString());
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
  }, [stageId, setSelectedStageID]);

  return <BotCard>Opened {stageName}</BotCard>;
}
