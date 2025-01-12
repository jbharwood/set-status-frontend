"use client";

import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { IStage } from "@/types/interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Delete, Edit, MoreHorizontal } from "lucide-react";
import { getStages } from "@/apiRequests";
import { useQuery } from "@tanstack/react-query";
import { useSelectedStageIDStore, useSocketStore } from "@/stores";
import { useSelectedStage } from "@/hooks";

export default function Stages() {
  const stages = useQuery({
    queryKey: ["stages", "list", { companyId: 1 }],
    queryFn: () => getStages(1),
  });
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const setSelectedStageID = useSelectedStageIDStore(
    (state) => state.setSelectedStageID
  );
  const socket = useSocketStore((state) => state.socket);

  useSelectedStage();

  function handleClick(stageID: number) {
    socket?.emit("leave_room", selectedStageID);
    setSelectedStageID(stageID);
  }

  return (
    <SidebarMenu>
      {stages.data?.map((stage: IStage) => (
        <SidebarMenuItem
          key={stage.id}
          className={selectedStageID === stage.id ? "bg-accent" : ""}
        >
          <SidebarMenuButton asChild onClick={() => handleClick(stage.id)}>
            <span>{stage.name}</span>
          </SidebarMenuButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction>
                <MoreHorizontal />
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuItem>
                <Edit />
                <span>Edit Stage</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Delete />
                <span>Delete Stage</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
