import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type IconButtonWithTooltipProps = {
  icon?: LucideIcon;
  tooltipText: string;
};

const IconButtonWithTooltip: React.FC<IconButtonWithTooltipProps> = ({
  icon: Icon,
  tooltipText,
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="w-1 h-5 font-size text-xs">
          {Icon && <Icon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default IconButtonWithTooltip;
