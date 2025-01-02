import {
  Filter,
  MessageCircle,
  MessageCircleOff,
  RefreshCcw,
  Pen,
  PenOff,
} from "lucide-react";
import { ButtonWithTooltip, SearchStagesCombobox } from "@/components/index";
import { useSelectedStageIDStore } from "@/stores";

export default function TobBar() {
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );

  return (
    <div className="bg-white dark:bg-sidebar shadow h-10 w-full">
      <div className="flex gap-2 ml-4">
        <div className="w-full flex-1 md:w-auto md:flex-none mt-0.5">
          <SearchStagesCombobox />
        </div>
        {selectedStageID && (
          <div className="flex gap-2 mt-2">
            <ButtonWithTooltip
              icon={RefreshCcw}
              tooltipText="Reset Stage Statuses"
            />
            <ButtonWithTooltip
              icon={Filter}
              tooltipText="Filter Production Roles"
            />
            <ButtonWithTooltip
              icon={MessageCircle}
              toggleIcon={MessageCircleOff}
              tooltipText="Show Feed"
              toggleTooltipText="Hide Feed"
            />
            <ButtonWithTooltip
              icon={Pen}
              toggleIcon={PenOff}
              tooltipText="Edit Mode"
              toggleTooltipText="Read Mode"
            />
          </div>
        )}
      </div>
    </div>
  );
}
