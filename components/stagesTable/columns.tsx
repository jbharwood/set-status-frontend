"use client";

import { IStage } from "@/types/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { Delete, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<IStage>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Row" />
    ),
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "stageId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StageId" />
    ),
    accessorFn: (row) => row.stageId,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    accessorFn: (row) => row.name,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    accessorFn: (row) => row.status,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const capitalizedStatus =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

      return (
        <div className="flex gap-2">
          <div
            className={`capture-status-bg ${status.toLowerCase()} rounded-full h-6 w-6`}
          />
          <div className="mt-0.5">{capitalizedStatus}</div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const stage = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Edit className="text-muted-foreground" />
              Edit Stage
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(stage.id.toString())}
            >
              <Delete className="text-muted-foreground" /> Delete Stage
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
