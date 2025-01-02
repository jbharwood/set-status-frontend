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

import { useIsSearchModalOpenStore } from "@/stores/index";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ILocation } from "@/types/interfaces";

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const isSearchModalOpen = useIsSearchModalOpenStore(
    (state) => state.isSearchModalOpen
  );

  const setIsSearchModalOpen = useIsSearchModalOpenStore(
    (state) => state.setIsSearchModalOpen
  );

  const stages = useQuery({
    queryKey: ["stages", "list"],
    queryFn: getStages,
  });

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
            ? stages.data?.find((stage: ILocation) => stage.name === value)
                ?.name
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
              {stages.data?.map((stage: ILocation) => (
                <CommandItem
                  key={stage.id}
                  value={stage.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
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
