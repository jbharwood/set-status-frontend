"use client";

import { getStages } from "@/apiRequests";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  useIsSearchModalOpenStore,
  useSelectedStageIDStore,
  useSocketStore,
} from "@/stores/index";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IStage } from "@/types/interfaces";
import { useSearchParams } from "next/navigation";

export default function SearchStagesCombobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const stages = useQuery({
    queryKey: ["stages", "list", { company_id: 1 }],
    queryFn: () => getStages(1),
  });
  const setSelectedStageID = useSelectedStageIDStore(
    (state) => state.setSelectedStageID
  );
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const isSearchModalOpen = useIsSearchModalOpenStore(
    (state) => state.isSearchModalOpen
  );
  const setIsSearchModalOpen = useIsSearchModalOpenStore(
    (state) => state.setIsSearchModalOpen
  );

  const socket = useSocketStore((state) => state.socket);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (selectedStageID) {
      setValue(
        stages.data?.find((stage: IStage) => stage.id === selectedStageID)?.name
      );
    }
  }, [selectedStageID]);

  function handleSelect(currentValue: string, stage: IStage) {
    socket?.emit("leave_room", selectedStageID);
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (currentValue === value) {
      setValue("");
      setSelectedStageID(null);
      newSearchParams.delete("stageID");
      window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
    } else {
      setValue(currentValue);
      setSelectedStageID(stage.id);
      newSearchParams.set("stageID", stage.id.toString());
      window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
    }
    setOpen(false);
  }

  return (
    <Popover open={isSearchModalOpen} onOpenChange={setIsSearchModalOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] h-7 justify-between mt-0.5"
        >
          {value
            ? stages.data?.find((stage: IStage) => stage.name === value)?.name
            : "Select Stage..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Stages..." />
          <CommandList>
            <CommandEmpty>No stage found.</CommandEmpty>
            <CommandGroup>
              {stages.data?.map((stage: IStage) => (
                <CommandItem
                  key={stage.id}
                  value={stage.name}
                  onSelect={(currentValue) => handleSelect(currentValue, stage)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === stage.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {stage.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
