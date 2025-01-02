import {
  Filter,
  MessageCircle,
  MessageCircleOff,
  RefreshCcw,
  Pen,
  PenOff,
} from "lucide-react";
import ButtonWithTooltip from "@/components/ButtonWithTooltip";

export default function TobBar() {
  return (
    <div className="bg-white dark:bg-sidebar shadow h-10 w-full">
      <div className="flex mt-2 gap-2 ml-4">
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
          toggleTooltipText="Write Mode"
        />
      </div>
    </div>
  );
}
