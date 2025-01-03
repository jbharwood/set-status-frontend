import {
  Filter,
  MessageCircle,
  MessageCircleOff,
  RefreshCcw,
  Pen,
  PenOff,
  NotebookPen,
  Notebook,
} from "lucide-react";
import { ButtonWithTooltip, SearchStagesCombobox } from "@/components/index";
import {
  useIsShowChatStore,
  useSelectedStageIDStore,
  useIsEditModeStore,
  useNotifyModalEventStore,
  useIsNotesEnabledStore,
} from "@/stores/index";
import {
  getProductionRoleCaptureStatuses,
  updateProductionRoleCaptureStatus,
} from "@/apiRequests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IProductionRoleCaptureStatus } from "@/types/interfaces";

export default function TobBar() {
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const isShowChat = useIsShowChatStore((state) => state.isShowChat);
  const setIsShowChat = useIsShowChatStore((state) => state.setIsShowChat);
  const isEditMode = useIsEditModeStore((state) => state.isEditMode);
  const setIsEditMode = useIsEditModeStore((state) => state.setIsEditMode);
  const setNotifyModalEvent = useNotifyModalEventStore(
    (state) => state.setNotifyModalEvent
  );
  const isNotesEnabled = useIsNotesEnabledStore(
    (state) => state.isNotesEnabled
  );
  const setIsNotesEnabled = useIsNotesEnabledStore(
    (state) => state.setIsNotesEnabled
  );

  const queryClient = useQueryClient();
  const productionRoleCaptureStatusMutation = useMutation({
    mutationFn: updateProductionRoleCaptureStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productionRoleCaptureStatuses", "list"],
      });
    },
  });

  const productionRoleCaptureStatuses = useQuery({
    queryKey: [
      "productionRoleCaptureStatuses",
      "list",
      { company_id: 1, stage_id: selectedStageID, is_active: true },
    ],
    queryFn: () =>
      selectedStageID !== null
        ? getProductionRoleCaptureStatuses({
            company_id: 1,
            stage_id: selectedStageID,
            is_active: true,
          })
        : Promise.resolve([]),
  });

  const handleResetStageStatuses = () => {
    setNotifyModalEvent({
      eventName: "Reset Stage Statuses",
      eventPrompt:
        "Are you sure you want to reset all stage statuses to yellow status?",
      cb: () => {
        productionRoleCaptureStatuses.data?.forEach(
          (prcs: IProductionRoleCaptureStatus) => {
            if (prcs.capture_status_id !== 2) {
              const temp = { ...prcs };
              temp.capture_status_id = 2;
              productionRoleCaptureStatusMutation.mutate(temp);
            }
          }
        );
      },
    });
  };

  return (
    <div className="bg-white dark:bg-sidebar shadow h-10 w-full">
      <div className="flex gap-2 ml-4">
        <div className="w-full flex-1 md:w-auto md:flex-none mt-1">
          <SearchStagesCombobox />
        </div>
        {selectedStageID && (
          <div className="flex gap-2 mt-2.5">
            <ButtonWithTooltip
              icon={MessageCircle}
              toggleIcon={MessageCircleOff}
              tooltipText="Show Feed"
              width="w-1"
              height="h-5"
              onClick={() => setIsShowChat(!isShowChat)}
            />
            <ButtonWithTooltip
              icon={Pen}
              toggleIcon={PenOff}
              tooltipText="Edit Mode Enabled"
              toggleTooltipText="Edit Mode Disabled"
              width="w-1"
              height="h-5"
              onClick={() => setIsEditMode(!isEditMode)}
            />
            <ButtonWithTooltip
              icon={Notebook}
              toggleIcon={NotebookPen}
              tooltipText="Capture Status Notes Disabled"
              toggleTooltipText="Capture Status Notes Enabled"
              width="w-1"
              height="h-5"
              onClick={() => setIsNotesEnabled(!isNotesEnabled)}
            />
            <ButtonWithTooltip
              icon={Filter}
              tooltipText="Filter Production Roles"
              width="w-1"
              height="h-5"
            />
            {isEditMode && (
              <ButtonWithTooltip
                icon={RefreshCcw}
                tooltipText="Reset Stage Statuses"
                width="w-1"
                height="h-5"
                onClick={handleResetStageStatuses}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
