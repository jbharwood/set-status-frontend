"use client";

import axios from "axios";
import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useEffect, useState } from "react";
import { ILocation } from "@/types/interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Delete, Edit, MoreHorizontal } from "lucide-react";

export default function Stages() {
  const [stages, setStages] = useState<ILocation[]>([]);

  async function fetchStages() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/locations`
    );
    setStages(response.data);
  }

  useEffect(() => {
    fetchStages();
  }, []);

  return (
    <SidebarMenu>
      {stages.map((stage) => (
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
