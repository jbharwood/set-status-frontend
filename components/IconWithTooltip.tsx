import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface IconWithTooltipProps {
  icon: LucideIcon;
  tooltipText: string;
  color?: string;
}

export default function IconWithTooltip({
  icon: Icon,
  tooltipText,
  color,
}: IconWithTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`inline-flex items-center h-4 w-4 ${color}`}>
          <Icon />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
