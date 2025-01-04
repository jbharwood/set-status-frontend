"use client";

import { useState, useRef } from "react";
import { send, upload } from "@/assets";
import Image from "next/image";
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

export default function Inputs() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const uploadInput = useRef<HTMLInputElement>(null);
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
    } else {
      uploadInput.current?.click();
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (
      file &&
      (file.type === "image/jpeg" || file.type === "image/png") &&
      user
    ) {
      const productionRoleCaptureStatus =
        productionRoleCaptureStatuses.data?.find(
          (prcs: IProductionRoleCaptureStatus) =>
            prcs.production_role_name === "Server"
        );
      const temp = { ...productionRoleCaptureStatus };
      const img = URL.createObjectURL(file);
      temp.notes = img;

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
      <Input
        className="hidden"
        type="file"
        ref={uploadInput}
        onChange={(e) => handleImageUpload(e)}
      />
      <Button
        className="w-full px-3 bg-blue-400 text-white font-fold rounded-md text-xl md:w-12 md:text-2xl"
        onClick={sendMessage}
      >
        <Image
          src={input ? send : upload}
          className="w-6 md:w-12 mx-auto"
          alt="send"
          height={20}
          width={20}
        />
      </Button>
    </div>
  );
}
