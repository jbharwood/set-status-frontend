import { captureStatusIdMap, captureStatusNameMap } from "@/lib/helpers";
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
  useIsWebViewStore,
} from "@/stores/index";
import ButtonWithTooltip from "./ButtonWithTooltip";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductionRoleCaptureStatus } from "@/apiRequests";
import { Badge } from "./ui/badge";
import { useUser } from "@clerk/nextjs";

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
  const { productionRole, captureStatus, notes } = productionRoleCaptureStatus;
  const isNotesEnabled = useIsNotesEnabledStore(
    (state) => state.isNotesEnabled
  );
  const isShowChat = useIsShowChatStore((state) => state.isShowChat);
  const isEditMode = useIsEditModeStore((state) => state.isEditMode);
  const isWebView = useIsWebViewStore((state) => state.isWebView);
  const setNotifyModalEvent = useNotifyModalEventStore(
    (state) => state.setNotifyModalEvent
  );
  const setEditModalEvent = useEditModalEventStore(
    (state) => state.setEditModalEvent
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

  function handleCaptureStatusClick(status: CaptureStatus) {
    if (!isEditMode) return;

    if (!isWebView) {
      setEditModalEvent({
        productionRoleCaptureStatus: productionRoleCaptureStatus,
        captureStatus: status,
        cb: (prcs) => {
          if (prcs) {
            productionRoleCaptureStatusMutation.mutate(prcs);
          }
        },
      });

      return;
    }

    if (!status) return;

    const temp = { ...productionRoleCaptureStatus };

    if (user?.fullName) {
      temp.lastModifiedBy = user.fullName;
    }

    if (!isNotesEnabled) {
      temp.captureStatusId = captureStatusIdMap[status];
      temp.notes = `Production Role Capture Status updated`;
      productionRoleCaptureStatusMutation.mutate(temp);
    } else {
      temp.notes =
        captureStatus.id === captureStatusIdMap[status] &&
        notes !== "Production Role Capture Status updated"
          ? notes
          : "";

      setEditModalEvent({
        productionRoleCaptureStatus: temp,
        captureStatus: status,
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
      eventName: `Hide ${productionRole.abbreviation}`,
      eventPrompt: `Are you sure you want to hide ${productionRole.name}?`,
      cb: () => {
        const temp = { ...productionRoleCaptureStatus };
        temp.isActive = false;
        temp.notes = "Production Role Capture Status is hidden";
        if (user?.fullName) {
          temp.lastModifiedBy = user.fullName;
        }
        productionRoleCaptureStatusMutation.mutate(temp);
      },
    });
  }

  const captureStatusName =
    captureStatusNameMap[captureStatus.id as keyof typeof captureStatusNameMap];

  if (!isWebView) {
    return (
      <div
        className={`flex flex-row w-full ${isEditMode ? "cursor-pointer" : "cursor-default"}`}
        onClick={() =>
          handleCaptureStatusClick(
            productionRoleCaptureStatus.captureStatus.name
          )
        }
      >
        <div
          className={`w-full h-32 flex capture-status-bg ${captureStatusName.toLowerCase()} border-2 border-black rounded`}
        >
          <div className="flex w-full h-full ml-auto p-2 justify-center items-center text-black">
            <div className="truncate text-9xl">
              {productionRole.abbreviation}
            </div>{" "}
            <Badge className="h-full w-52 text-9xl text-black bg-white ml-auto justify-center items-center">
              {captureStatusName[0]}
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center w-36 h-full`}>
      <div className={`w-full flex flex-col h-full`}>
        <div
          className={`${isFirst ? "rounded-tl" : ""} ${isLast ? "rounded-tr" : ""} border border-black bg-slate-700 ${isWebView ? "h-[7.5%]" : "h-[30%]"} w-full flex items-center justify-center truncate flex-nowrap`}
        >
          <div className={`text-white truncate ${isEditMode ? "ml-1" : ""}`}>
            {productionRole.abbreviation}
          </div>
          {isEditMode && (
            <div className="ml-auto mt-0.5 justify-center">
              <ButtonWithTooltip
                icon={X}
                tooltipText={`Hide ${productionRole.abbreviation}`}
                className="h-full w-1"
                variant={"destructive"}
                onClick={() => handleHide(productionRoleCaptureStatus)}
              />
            </div>
          )}
        </div>
        <div
          className={`border ${isEditMode ? "cursor-pointer" : "cursor-default"} border-black ${captureStatus.id === 2 ? "bg-green-500" : "bg-slate-500"} h-[30%] w-full hover:bg-green-400`}
          onClick={() => handleCaptureStatusClick("Green")}
        />
        <div
          className={`border ${isEditMode ? "cursor-pointer" : "cursor-default"} border-black ${captureStatus.id === 3 ? "bg-amber-500" : "bg-slate-500"} h-[30%] w-full hover:bg-amber-400`}
          onClick={() => handleCaptureStatusClick("Yellow")}
        />
        <div
          className={`border ${isEditMode ? "cursor-pointer" : "cursor-default"} border-black ${captureStatus.id === 4 ? "bg-red-500" : "bg-slate-500"} h-[30%] w-full hover:bg-red-400`}
          onClick={() => handleCaptureStatusClick("Red")}
        />
        <div
          className={`${isFirst ? "rounded-bl" : ""} ${isLast ? "rounded-br" : ""} border border-black bg-slate-800/80 ${isShowChat ? "h-[30%]" : "h-[70%]"} w-full text-center text-white overflow-auto p-1`}
        >
          {notes}
        </div>
      </div>
    </div>
  );
}
