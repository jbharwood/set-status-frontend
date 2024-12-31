import { captureStatusIdMap } from "@/lib/helpers";
import {
  CaptureStatus,
  IProductionRoleCaptureStatus,
} from "@/types/interfaces";
import { Dispatch, SetStateAction } from "react";

type ProductionCaptureStatusProps = {
  productionRoleCaptureStatus: IProductionRoleCaptureStatus;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedProductionRoleCaptureStatus: Dispatch<
    SetStateAction<IProductionRoleCaptureStatus | null>
  >;
  setSelectedCaptureStatus: Dispatch<SetStateAction<CaptureStatus>>;
};

export default function ProductionRoleCaptureStatus({
  productionRoleCaptureStatus,
  setIsEditModalOpen,
  setSelectedProductionRoleCaptureStatus,
  setSelectedCaptureStatus,
}: ProductionCaptureStatusProps) {
  const { production_role_abbreviation, capture_status_id, notes } =
    productionRoleCaptureStatus;

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

  return (
    <div className="flex flex-col items-center justify-center h-full w-36 sm:w-36 md:w-36 lg:w-36 xl:w-36">
      <div className="border border-black bg-slate-700 h-[7.5%] w-full flex items-center justify-center truncate">
        {production_role_abbreviation}
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
      <div className="border border-black bg-slate-700 h-[30%] w-full text-center">
        {notes}
      </div>
    </div>
  );
}
