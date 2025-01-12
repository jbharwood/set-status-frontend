"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { getStageCaptureStatuses } from "@/apiRequests/stageStatus";

export default function StageTable() {
  const stages = useQuery({
    queryKey: ["stageCaptureStatuses", "list", { companyId: 1 }],
    queryFn: () => getStageCaptureStatuses(1),
  });

  return (
    <div className="container mx-auto p-2">
      <DataTable columns={columns} data={stages.data ?? []} />
    </div>
  );
}
