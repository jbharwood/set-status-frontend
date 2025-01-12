"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useSelectedStageIDStore from "@/stores/useSelectedStageIDStore";

export default function useSelectedStage() {
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const setSelectedStageID = useSelectedStageIDStore(
    (state) => state.setSelectedStageID
  );
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (selectedStageID !== null) {
      setSelectedStageID(selectedStageID);
      newSearchParams.set("stage", selectedStageID.toString());
      window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
    }
  }, [selectedStageID, setSelectedStageID]);

  return null;
}
