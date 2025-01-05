import { captureStatusIdMap } from "@/lib/helpers";
import {
  CaptureStatus,
  IProductionRoleCaptureStatus,
} from "@/types/interfaces";
import {
  useIsNotesEnabledStore,
  useIsEditModeStore,
  useIsShowChatStore,
  useNotifyModalEventStore,
  useEditModalEventStore,
} from "@/stores/index";
import ButtonWithTooltip from "./ButtonWithTooltip";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductionRoleCaptureStatus } from "@/apiRequests";

type ProductionCaptureStatusProps = {
  productionRoleCaptureStatus: IProductionRoleCaptureStatus;
  isFirst?: boolean;
  isLast?: boolean;
};

export default function ProductionRoleCaptureStatus({
  productionRoleCaptureStatus,
  isFirst = false,
  isLast = false,
}: ProductionCaptureStatusProps) {
  const {
    production_role_abbreviation,
    production_role_name,
    capture_status_id,
    notes,
  } = productionRoleCaptureStatus;
  const isNotesEnabled = useIsNotesEnabledStore(
    (state) => state.isNotesEnabled
  );
  const isShowChat = useIsShowChatStore((state) => state.isShowChat);
  const isEditMode = useIsEditModeStore((state) => state.isEditMode);
  const setNotifyModalEvent = useNotifyModalEventStore(
    (state) => state.setNotifyModalEvent
  );
  const setEditModalEvent = useEditModalEventStore(
    (state) => state.setEditModalEvent
  );

  const queryClient = useQueryClient();
  const productionRoleCaptureStatusMutation = useMutation({
    mutationFn: updateProductionRoleCaptureStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ["productionRoleCaptureStatuses", "list"],
          ["productionRoleCaptureStatusesHistory", "list"],
        ],
      });
    },
  });

  function handleCaptureStatusClick(captureStatus: CaptureStatus) {
    if (!isEditMode || !captureStatus) return;

    const temp = { ...productionRoleCaptureStatus };

    if (!isNotesEnabled) {
      temp.capture_status_id = captureStatusIdMap[captureStatus];
      temp.notes = `Production Role Capture Status updated`;
      productionRoleCaptureStatusMutation.mutate(temp);
    } else {
      temp.notes =
        capture_status_id === captureStatusIdMap[captureStatus] &&
        notes !== "Production Role Capture Status updated"
          ? notes
          : "";

      setEditModalEvent({
        productionRoleCaptureStatus: temp,
        captureStatus: captureStatus,
        cb: (prcs) => {
          if (prcs) {
            productionRoleCaptureStatusMutation.mutate(prcs);
          }
        },
      });
    }
  }

  function handleHide(
    productionRoleCaptureStatus: IProductionRoleCaptureStatus
  ) {
    setNotifyModalEvent({
      eventName: `Hide ${production_role_name}`,
      eventPrompt: `Are you sure you want to hide ${production_role_name}?`,
      cb: () => {
        const temp = { ...productionRoleCaptureStatus };
        temp.is_active = false;
        productionRoleCaptureStatusMutation.mutate(temp);
      },
    });
  }

  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-36 sm:w-36 md:w-36 lg:w-36 xl:w-36`}
    >
      <div
        className={`${isFirst ? "rounded-tl" : ""} ${isLast ? "rounded-tr" : ""} border border-black bg-slate-700 h-[7.5%] w-full flex items-center justify-center truncate flex-nowrap`}
      >
        <div className={`truncate ${isEditMode ? "ml-1" : ""}`}>
          {production_role_abbreviation}
        </div>
        {isEditMode && (
          <div className="ml-auto mt-0.5 justify-center">
            <ButtonWithTooltip
              icon={X}
              tooltipText={`Hide ${production_role_abbreviation}`}
              height="h-full"
              width="w-1"
              onClick={() => handleHide(productionRoleCaptureStatus)}
            />
          </div>
        )}
      </div>
      <div
        className={`border ${isEditMode ? "cursor-pointer" : "cursor-default"} border-black ${capture_status_id === 2 ? "bg-green-500" : "bg-slate-500"} h-[30%] w-full hover:bg-green-400`}
        onClick={() => handleCaptureStatusClick("Green")}
      />
      <div
        className={`border ${isEditMode ? "cursor-pointer" : "cursor-default"} border-black ${capture_status_id === 3 ? "bg-yellow-500" : "bg-slate-500"} h-[30%] w-full hover:bg-yellow-400`}
        onClick={() => handleCaptureStatusClick("Yellow")}
      />
      <div
        className={`border ${isEditMode ? "cursor-pointer" : "cursor-default"} border-black ${capture_status_id === 4 ? "bg-red-500" : "bg-slate-500"} h-[30%] w-full hover:bg-red-400`}
        onClick={() => handleCaptureStatusClick("Red")}
      />
      <div
        className={`${isFirst ? "rounded-bl" : ""} ${isLast ? "rounded-br" : ""} border border-black bg-slate-800/80 ${isShowChat ? "h-[30%]" : "h-[70%]"} w-full text-center overflow-auto p-1`}
      >
        {notes}
      </div>
    </div>
  );
}
