"use client";

import { useState } from "react";
import { IProductionRoleCaptureStatus } from "@/types/interfaces";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useSelectedStageIDStore } from "@/stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductionRoleCaptureStatuses,
  updateProductionRoleCaptureStatus,
} from "@/apiRequests";
import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";

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
      { companyId: 1, stageId: selectedStageID, isActive: false },
    ],
    queryFn: () =>
      selectedStageID !== null
        ? getProductionRoleCaptureStatuses({
            companyId: 1,
            stageId: selectedStageID,
            isActive: false,
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
          ["stageCaptureStatus", "single"],
        ],
      });
    },
  });

  function sendMessage() {
    if (input && user && selectedStageID) {
      const productionRoleCaptureStatus =
        productionRoleCaptureStatuses.data?.find(
          (prcs: IProductionRoleCaptureStatus) =>
            prcs.productionRole.name === "Server"
        );
      const temp = { ...productionRoleCaptureStatus };
      temp.notes = input;
      if (user?.fullName) {
        temp.lastModifiedBy = user.fullName;
      }

      productionRoleCaptureStatusMutation.mutate(temp);
      setInput("");
    }
  }

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        className="focus:outline-none focus:ring focus:border-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <Button
        onClick={sendMessage}
        className="w-full px-3 bg-blue-400 font-fold rounded-md text-xl md:w-12 md:text-2xl"
      >
        <SendHorizonal />
      </Button>
    </div>
  );
}
