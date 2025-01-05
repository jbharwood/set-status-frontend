"use client";

import { useState, useRef } from "react";
import { IProductionRoleCaptureStatus } from "@/types/interfaces";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { useSelectedStageIDStore } from "@/stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductionRoleCaptureStatuses,
  updateProductionRoleCaptureStatus,
} from "@/apiRequests";
import { SendHorizonal } from "lucide-react";
import ButtonWithTooltip from "./ButtonWithTooltip";

export default function Inputs() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );

  const queryClient = useQueryClient();
  const productionRoleCaptureStatuses = useQuery({
    queryKey: [
      "productionRoleCaptureStatuses",
      "list",
      { company_id: 1, stage_id: selectedStageID, is_active: false },
    ],
    queryFn: () =>
      selectedStageID !== null
        ? getProductionRoleCaptureStatuses({
            company_id: 1,
            stage_id: selectedStageID,
            is_active: false,
          })
        : Promise.resolve([]),
  });

  const productionRoleCaptureStatusMutation = useMutation({
    mutationFn: updateProductionRoleCaptureStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ["productionRoleCaptureStatuses", "list"],
          ["productionRoleCaptureStatusesHistory", "list"],
        ],
      });
    },
  });

  function sendMessage() {
    if (input && user && selectedStageID) {
      const productionRoleCaptureStatus =
        productionRoleCaptureStatuses.data?.find(
          (prcs: IProductionRoleCaptureStatus) =>
            prcs.production_role_name === "Server"
        );
      const temp = { ...productionRoleCaptureStatus };
      temp.notes = input;

      productionRoleCaptureStatusMutation.mutate(temp);
      setInput("");
    }
  }

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        className="focus:outline-none focus:ring focus:border-blue-300"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <ButtonWithTooltip
        onClick={sendMessage}
        tooltipText="Send Message"
        icon={SendHorizonal}
        className="w-full px-3 bg-blue-400 font-fold rounded-md text-xl md:w-12 md:text-2xl"
      />
    </div>
  );
}
