"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MultipleSelector, { Option } from "./ui/multiple-selector";
import { useIsFilterModalOpenStore, useSelectedStageIDStore } from "@/stores";
import { getProductionRoleCaptureStatuses } from "@/apiRequests";
import { IProductionRoleCaptureStatus } from "@/types/interfaces";
import {
  getProductionRoleCaptureStatusById,
  updateProductionRoleCaptureStatus,
} from "@/apiRequests/stageStatus";
import { useUser } from "@clerk/nextjs";

export default function FilterModal() {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const isFilterModalOpen = useIsFilterModalOpenStore(
    (state) => state.isFilterModalOpen
  );
  const setIsFilterModalOpen = useIsFilterModalOpenStore(
    (state) => state.setIsFilterModalOpen
  );
  const { user } = useUser();

  const queryClient = useQueryClient();
  const productionRoleCaptureStatusMutation = useMutation({
    mutationFn: updateProductionRoleCaptureStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ["productionRoleCaptureStatuses", "list"],
          ["productionRoleCaptureStatusesHistory", "list"],
          ["stageCaptureStatus", "single"],
        ],
      });
    },
  });

  const productionRoleCaptureStatuses = useQuery({
    queryKey: [
      "productionRoleCaptureStatuses",
      "list",
      { companyId: 1, stageId: selectedStageID, isActive: true },
    ],
    queryFn: () =>
      selectedStageID !== null
        ? getProductionRoleCaptureStatuses({
            companyId: 1,
            stageId: selectedStageID,
            isActive: true,
          })
        : Promise.resolve([]),
  });

  const productionRoleCaptureStatusesOptions = useQuery({
    queryKey: [
      "productionRoleCaptureStatuses",
      "list",
      { companyId: 1, stageId: selectedStageID },
    ],
    queryFn: () =>
      selectedStageID !== null
        ? getProductionRoleCaptureStatuses({
            companyId: 1,
            stageId: selectedStageID,
          })
        : Promise.resolve([]),
    select: (data) => {
      const options = data
        .filter(
          (prod: IProductionRoleCaptureStatus) =>
            prod.productionRole.name !== "Server"
        )
        .map(
          (prod: IProductionRoleCaptureStatus): Option => ({
            value: prod.id?.toString() || "",
            label: prod.productionRole.abbreviation,
            isActive: prod.isActive,
          })
        );
      return options;
    },
  });

  async function handleFilterChange(data: Option[]) {
    setSelectedOptions(data);

    const nonMatchingValue = data.filter(
      (option: Option) =>
        !productionRoleCaptureStatuses.data?.some(
          (prcs: IProductionRoleCaptureStatus) =>
            option.value === prcs.id?.toString()
        )
    );

    if (nonMatchingValue.length > 0) {
      await updateIsActive(
        nonMatchingValue[0].value,
        "Production Role Capture Status is active"
      );
    } else {
      const nonMatchingPRCS = productionRoleCaptureStatuses.data?.filter(
        (prcs: IProductionRoleCaptureStatus) =>
          !data.some((option: Option) => option.value === prcs.id?.toString())
      );

      if (nonMatchingPRCS.length > 0) {
        await updateIsActive(
          nonMatchingPRCS[0].id,
          "Production Role Capture Status is hidden"
        );
      }
    }
  }

  async function updateIsActive(id: string, notes: string) {
    const status = await getProductionRoleCaptureStatusById(parseInt(id));
    status.isActive = !status.isActive;
    status.notes = notes;
    status.capture_status_id = 3;
    if (user?.fullName) {
      status.lastModifiedBy = user.fullName;
    }
    productionRoleCaptureStatusMutation.mutate(status);
  }

  useEffect(() => {
    const activeData = productionRoleCaptureStatusesOptions.data?.filter(
      (prcs: IProductionRoleCaptureStatus) => prcs.isActive
    );
    setSelectedOptions(activeData);
  }, [productionRoleCaptureStatusesOptions.data]);

  return (
    <>
      {productionRoleCaptureStatusesOptions.data && (
        <Dialog
          open={isFilterModalOpen}
          onOpenChange={() => {
            setIsFilterModalOpen(false);
          }}
        >
          <DialogContent className="sm:max-w-[425px] mt-[-100px]">
            <DialogHeader>
              <DialogTitle>Filter Production Roles</DialogTitle>
            </DialogHeader>
            <VisuallyHidden>
              <DialogDescription>
                Edit Production Role Capture Status
              </DialogDescription>
            </VisuallyHidden>
            <div className="w-full">
              <MultipleSelector
                value={selectedOptions}
                defaultOptions={productionRoleCaptureStatusesOptions.data}
                placeholder="Search..."
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    No results found
                  </p>
                }
                onChange={handleFilterChange}
                maxSelected={10}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
