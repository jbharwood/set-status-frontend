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

  return (
    <div className="flex flex-col items-center justify-center h-full w-36 p-2">
      <div className="border border-black bg-slate-700 h-[7.5%] w-36 flex items-center justify-center">
        {production_role_abbreviation}
      </div>
      <div
        className={`border border-black ${capture_status_id === 1 ? "bg-green-500" : "bg-slate-500"} h-[30%] w-36 cursor-pointer hover:bg-green-400`}
        onClick={() => {
          setIsEditModalOpen(true);
          setSelectedProductionRoleCaptureStatus(productionRoleCaptureStatus);
          setSelectedCaptureStatus("Green");
        }}
      />
      <div
        className={`border border-black ${capture_status_id === 2 ? "bg-yellow-500" : "bg-slate-500"} h-[30%] w-36 cursor-pointer hover:bg-yellow-400`}
        onClick={() => {
          setIsEditModalOpen(true);
          setSelectedProductionRoleCaptureStatus(productionRoleCaptureStatus);
          setSelectedCaptureStatus("Yellow");
        }}
      />
      <div
        className={`border border-black ${capture_status_id === 3 ? "bg-red-500" : "bg-slate-500"} h-[30%] w-36 cursor-pointer hover:bg-red-400`}
        onClick={() => {
          setIsEditModalOpen(true);
          setSelectedProductionRoleCaptureStatus(productionRoleCaptureStatus);
          setSelectedCaptureStatus("Red");
        }}
      />
      <div className="border border-black bg-slate-700 h-[30%] w-36 text-center">
        {notes}
      </div>
    </div>
  );
}
