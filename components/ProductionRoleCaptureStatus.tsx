import { captureStatusIdMap } from "@/lib/helpers";
import {
  CaptureStatus,
  IProductionRoleCaptureStatus,
} from "@/types/interfaces";
import {
  useIsEditModalOpenStore,
  useIsShowChatStore,
  useSelectedCaptureStatusStore,
  useSelectedProductionRoleCaptureStatusStore,
} from "@/stores/index";
import ButtonWithTooltip from "./ButtonWithTooltip";
import { X } from "lucide-react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateProductionRoleCaptureStatus } from "@/apiRequests";

type ProductionCaptureStatusProps = {
  productionRoleCaptureStatus: IProductionRoleCaptureStatus;
};

export default function ProductionRoleCaptureStatus({
  productionRoleCaptureStatus,
}: ProductionCaptureStatusProps) {
  const { production_role_abbreviation, capture_status_id, notes } =
    productionRoleCaptureStatus;
  const setIsEditModalOpen = useIsEditModalOpenStore(
    (state) => state.setIsEditModalOpen
  );
  const setSelectedCaptureStatus = useSelectedCaptureStatusStore(
    (state) => state.setSelectedCaptureStatus
  );
  const setSelectedProductionRoleCaptureStatus =
    useSelectedProductionRoleCaptureStatusStore(
      (state) => state.setSelectedProductionRoleCaptureStatus
    );
  const isShowChat = useIsShowChatStore((state) => state.isShowChat);

  const queryClient = useQueryClient();
  const productionRoleCaptureStatusMutation = useMutation({
    mutationFn: updateProductionRoleCaptureStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productionRoleCaptureStatuses", "list"],
      });
    },
  });

  function handleOnClick(captureStatus: CaptureStatus) {
    setIsEditModalOpen(true);
    const temp = { ...productionRoleCaptureStatus };
    temp.notes =
      captureStatus && capture_status_id === captureStatusIdMap[captureStatus]
        ? notes
        : "";
    setSelectedProductionRoleCaptureStatus(temp);
    setSelectedCaptureStatus(captureStatus);
  }

  function handleHide(
    productionRoleCaptureStatus: IProductionRoleCaptureStatus
  ): void {
    const temp = { ...productionRoleCaptureStatus };
    temp.is_active = false;
    productionRoleCaptureStatusMutation.mutate(temp);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-36 sm:w-36 md:w-36 lg:w-36 xl:w-36">
      <div className="border border-black bg-slate-700 h-[7.5%] w-full flex items-center justify-center truncate flex-nowrap">
        <div className="ml-1">{production_role_abbreviation}</div>
        <div className="ml-auto mt-0.5 justify-center">
          <ButtonWithTooltip
            icon={X}
            tooltipText={`Hide ${production_role_abbreviation}`}
            height="h-full"
            width="w-1"
            onClick={() => handleHide(productionRoleCaptureStatus)}
          />
        </div>
      </div>
      <div
        className={`border border-black ${capture_status_id === 1 ? "bg-green-500" : "bg-slate-500"} h-[30%] w-full cursor-pointer hover:bg-green-400`}
        onClick={() => handleOnClick("Green")}
      />
      <div
        className={`border border-black ${capture_status_id === 2 ? "bg-yellow-500" : "bg-slate-500"} h-[30%] w-full cursor-pointer hover:bg-yellow-400`}
        onClick={() => handleOnClick("Yellow")}
      />
      <div
        className={`border border-black ${capture_status_id === 3 ? "bg-red-500" : "bg-slate-500"} h-[30%] w-full cursor-pointer hover:bg-red-400`}
        onClick={() => handleOnClick("Red")}
      />
      <div
        className={`border border-black bg-slate-700 ${isShowChat ? "h-[30%]" : "h-[70%]"} w-full text-center`}
      >
        {notes}
      </div>
    </div>
  );
}
