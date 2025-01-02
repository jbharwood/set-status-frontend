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

type ButtonWithTooltipProps = {
  icon?: LucideIcon;
  toggleIcon?: LucideIcon;
  tooltipText: string;
  toggleTooltipText?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
};

const ButtonWithTooltip: React.FC<ButtonWithTooltipProps> = ({
  icon: Icon,
  toggleIcon: ToggleIcon,
  tooltipText,
  toggleTooltipText,
  onClick,
  width,
  height,
}) => {
  const [toggled, setToggled] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={`${width} ${height} font-size text-xs`}
            onClick={() => {
              setToggled(!toggled);
              if (onClick) onClick();
            }}
          >
            {toggled && ToggleIcon ? <ToggleIcon /> : Icon && <Icon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {toggled && toggleTooltipText ? toggleTooltipText : tooltipText}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ButtonWithTooltip;
