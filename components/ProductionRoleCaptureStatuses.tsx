import { IProductionRoleCaptureStatus } from "@/types/interfaces";
import ProductionRoleCaptureStatus from "./ProductionRoleCaptureStatus";
import { useQuery } from "@tanstack/react-query";
import { getProductionRoleCaptureStatuses } from "@/apiRequests";

export default function ProductionRoleCaptureStatuses() {
  const productionRoleCaptureStatuses = useQuery({
    queryKey: ["productionRoleCaptureStatuses", "list"],
    queryFn: getProductionRoleCaptureStatuses,
  });

  return (
    <div className="flex flex-row items-center justify-center w-full h-full p-2">
      {productionRoleCaptureStatuses.data?.map(
        (prcs: IProductionRoleCaptureStatus) => (
          <ProductionRoleCaptureStatus
            key={prcs.id}
            productionRoleCaptureStatus={prcs}
          />
        )
      )}
    </div>
  );
}
