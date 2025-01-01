import { Filter, RefreshCcw } from "lucide-react";
import ButtonWithTooltip from "@/components/ButtonWithTooltip";

export default function TobBar() {
  return (
    <div className="bg-white dark:bg-sidebar shadow h-10 w-full">
      <div className="flex mt-2 gap-2 ml-9">
        <ButtonWithTooltip icon={RefreshCcw} tooltipText="Refresh Stage" />
        <ButtonWithTooltip
          icon={Filter}
          tooltipText="Filter Production Roles"
        />
      </div>
    </div>
  );
}
