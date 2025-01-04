import { IProductionRoleCaptureStatus } from "@/types/interfaces";
import ProductionRoleCaptureStatus from "./ProductionRoleCaptureStatus";
import { useQuery } from "@tanstack/react-query";
import { getProductionRoleCaptureStatuses } from "@/apiRequests";
import { useSelectedStageIDStore } from "@/stores";

export default function ProductionRoleCaptureStatuses() {
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );

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

  return (
    <div className="flex flex-row items-center justify-center w-full h-full p-2">
      {productionRoleCaptureStatuses?.data?.map(
        (prcs: IProductionRoleCaptureStatus) => (
          <ProductionRoleCaptureStatus
            key={prcs.id}
            productionRoleCaptureStatus={prcs}
            isFirst={prcs.id === productionRoleCaptureStatuses.data[0].id}
            isLast={
              prcs.id === productionRoleCaptureStatuses.data.slice(-1)[0].id
            }
          />
        )
      )}
    </div>
  );
}
