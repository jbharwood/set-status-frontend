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
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useSelectedStageIDStore } from "@/stores";
import { useSearchParams } from "next/navigation";

export default function Stages() {
  const stages = useSuspenseQuery({
    queryKey: ["stages", "list", { company_id: 1 }],
    queryFn: () => getStages(1),
  });
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const setSelectedStageID = useSelectedStageIDStore(
    (state) => state.setSelectedStageID
  );
  const searchParams = useSearchParams();

  function handleClick(stageID: number) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    setSelectedStageID(stageID);
    newSearchParams.set("stageID", stageID.toString());
    window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
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
