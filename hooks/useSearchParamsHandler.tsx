"use client";

import { useSelectedStageIDStore } from "@/stores";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useSearchParamsHandler() {
  const searchParams = useSearchParams();
  const stageID = searchParams.get("stageID");
  const setSelectedStageID = useSelectedStageIDStore(
    (state) => state.setSelectedStageID
  );

  useEffect(() => {
    if (stageID && !isNaN(Number(stageID))) {
      setSelectedStageID(parseInt(stageID));
    } else {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("stageID");
      const newSearchString = newSearchParams.toString();
      const newUrl = newSearchString
        ? `?${newSearchString}`
        : window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }
  }, [stageID]);
}
