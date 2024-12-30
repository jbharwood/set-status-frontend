import { IProductionRoleCaptureStatus } from "@/types/interfaces";

type ProductionCaptureStatusProps = {
  productionRoleCaptureStatus: IProductionRoleCaptureStatus;
  setIsEditModalOpen: (value: boolean) => void;
};

export default function ProductionRoleCaptureStatus({
  productionRoleCaptureStatus,
  setIsEditModalOpen,
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
        onClick={() => setIsEditModalOpen(true)}
      />
      <div
        className={`border border-black ${capture_status_id === 2 ? "bg-yellow-500" : "bg-slate-500"} h-[30%] w-36 cursor-pointer hover:bg-yellow-400`}
        onClick={() => setIsEditModalOpen(true)}
      />
      <div
        className={`border border-black ${capture_status_id === 3 ? "bg-red-500" : "bg-slate-500"} h-[30%] w-36 cursor-pointer hover:bg-red-400`}
        onClick={() => setIsEditModalOpen(true)}
      />
      <div className="border border-black bg-slate-700 h-[30%] w-36 text-center">
        {notes}
      </div>
    </div>
  );
}
