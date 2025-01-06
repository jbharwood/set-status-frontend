"use client";

import { useSelectedStageIDStore } from "@/stores";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useIsWebViewStore from "@/stores/useIsWebViewStore";

export default function useSearchParamsHandler() {
  const searchParams = useSearchParams();
  const stageID = searchParams.get("stageID");
  const isWebView = searchParams.get("isWebView");
  const setSelectedStageID = useSelectedStageIDStore(
    (state) => state.setSelectedStageID
  );
  const setIsWebView = useIsWebViewStore((state) => state.setIsWebView);

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

  useEffect(() => {
    if (isWebView === "1" || isWebView === "true") {
      setIsWebView(true);
    } else if (isWebView === "0" || isWebView === "false") {
      setIsWebView(false);
    } else {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("isWebView");
      const newSearchString = newSearchParams.toString();
      const newUrl = newSearchString
        ? `?${newSearchString}`
        : window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }
  }, [isWebView]);
}
