"use client";

import {
  ChevronRight,
  ChevronsUpDown,
  Film,
  Home,
  LogOut,
  Plus,
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
import { UserButton, useClerk, useUser } from "@clerk/nextjs";
import { useClerkTheme } from "@/hooks";
import "@/app/globals.css";
import IconWithTooltip from "./IconWithTooltip";
import Link from "next/link";
import { useIsWebViewStore } from "@/stores";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
];

export function AppSidebar() {
  const { user } = useUser();
  const { clerkTheme } = useClerkTheme();
  const { signOut } = useClerk();
  const isWebView = useIsWebViewStore((state) => state.isWebView);

  return (
    <div className={`${!isWebView ? "hidden-in-fullscreen" : ""}`}>
      <Sidebar>
        <SidebarHeader>
          <div className="font-bold flex gap-1 text-2xl items-center">
            <Film height={30} width={30} />
            Stage Status
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupAction className="mr-6 gap-1">
                <IconWithTooltip
                  icon={Plus}
                  tooltipText="Add Stage"
                  color="text-gray-500"
                />
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
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    {user ? (
                      <UserButton
                        appearance={{
                          baseTheme: clerkTheme,
                        }}
                      />
                    ) : (
                      <User2 />
                    )}
                    <div className="flex-row">
                      <div className="font-bold">{user?.fullName}</div>
                      <div className="text-[.7rem]/[1rem]">
                        {user?.primaryEmailAddress?.emailAddress}
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
    </div>
  );
}
