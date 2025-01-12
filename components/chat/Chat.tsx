"use client";

import { IProductionRoleCaptureStatusesHistory } from "@/types/interfaces";
import { useEffect, useRef } from "react";
import { Message } from "@/components/index";
import { useSelectedStageIDStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";
import { getProductionRoleCaptureStatusesHistory } from "@/apiRequests/stageStatus";

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );

  const productionRoleCaptureStatusesHistory = useQuery({
    queryKey: [
      "productionRoleCaptureStatusesHistory",
      "list",
      { companyId: 1, stageId: selectedStageID },
    ],
    queryFn: () =>
      selectedStageID !== null
        ? getProductionRoleCaptureStatusesHistory({
            companyId: 1,
            stageId: selectedStageID,
          })
        : Promise.resolve([]),
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [productionRoleCaptureStatusesHistory.data?.length]);

  return (
    <div className="flex flex-col overflow-y-auto h-full" ref={messagesEndRef}>
      {productionRoleCaptureStatusesHistory.data?.map(
        (prcsh: IProductionRoleCaptureStatusesHistory) => {
          return <Message key={prcsh.id} content={prcsh} type={"text"} />;
        }
      )}
      <div ref={messagesEndRef} className="overflow-auto" />
    </div>
  );
}
