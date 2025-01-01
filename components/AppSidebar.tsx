"use client";

import {
  ChevronRight,
  ChevronsUpDown,
  Film,
  Home,
  LogOut,
  Plus,
  Search,
  Settings,
  User2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Suspense } from "react";
import { ChangeTheme, Stages, StagesSkeleton } from "@/components/index";
import { useCurrentUser } from "@/context/UserContext";
import { UserButton, useClerk } from "@clerk/nextjs";
import { useClerkTheme } from "@/hooks";
import "@/app/globals.css";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { currentUser } = useCurrentUser();
  const { clerkTheme } = useClerkTheme();
  const { signOut } = useClerk();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="font-bold flex gap-1">
          <Film />
          Stage Status
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupAction className="mr-6">
              <Plus /> <span className="sr-only">Add Stage</span>
            </SidebarGroupAction>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Stages
                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <Suspense fallback={<StagesSkeleton />}>
                  <Stages />
                </Suspense>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {currentUser ? (
                    <UserButton
                      appearance={{
                        baseTheme: clerkTheme,
                      }}
                    />
                  ) : (
                    <User2 />
                  )}
                  <div className="flex-row">
                    <div className="font-bold">{currentUser?.name}</div>
                    <div className="text-[.7rem]/[1rem]">
                      {currentUser?.email}
                    </div>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="w-[--radix-popper-anchor-width]"
              >
                <ChangeTheme />
                <DropdownMenuItem>
                  <LogOut />
                  <span onClick={() => signOut({ redirectUrl: "/" })}>
                    Log out
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
