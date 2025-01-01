"use client";

import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";

type IconButtonWithTooltipProps = {
  icon?: LucideIcon;
  toggleIcon?: LucideIcon;
  tooltipText: string;
};

const IconButtonWithTooltip: React.FC<IconButtonWithTooltipProps> = ({
  icon: Icon,
  toggleIcon: ToggleIcon,
  tooltipText,
}) => {
  const [toggled, setToggled] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="w-1 h-5 font-size text-xs"
            onClick={() => setToggled(!toggled)}
          >
            {toggled && ToggleIcon ? <ToggleIcon /> : Icon && <Icon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconButtonWithTooltip;
