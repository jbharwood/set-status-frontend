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

export default function Stages() {
  const stages = useQuery({
    queryKey: ["stages", "list", { company_id: 1 }],
    queryFn: () => getStages(1),
  });

  return (
    <SidebarMenu>
      {stages.data?.map((stage: IStage) => (
        <SidebarMenuItem key={stage.id}>
          <SidebarMenuButton asChild>
            <a href={stage.name}>
              {/* <item.icon /> */}
              <span>{stage.name}</span>
            </a>
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
