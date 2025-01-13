import { IProductionRoleCaptureStatus } from "@/types/interfaces";
import ProductionRoleCaptureStatus from "./ProductionRoleCaptureStatus";
import { useQuery } from "@tanstack/react-query";
import { getProductionRoleCaptureStatuses } from "@/apiRequests";
import { useIsWebViewStore, useSelectedStageIDStore } from "@/stores";

export default function ProductionRoleCaptureStatuses() {
  const selectedStageID = useSelectedStageIDStore(
    (state) => state.selectedStageID
  );
  const isWebView = useIsWebViewStore((state) => state.isWebView);

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

  return (
    <div
      className={
        isWebView
          ? "flex items-center justify-center w-full h-full p-2"
          : "flex-row w-full h-full p-10"
      }
    >
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
