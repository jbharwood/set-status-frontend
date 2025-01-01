  import { IProductionRoleCaptureStatus } from "@/types/interfaces";
import axios from "axios";
  
  export async function getProductionRoleCaptureStatuses() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/productionRoleCaptureStatuses`
    );
    return response.data;
  }

  export async function getStages() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/locations`
    );
    return response.data;
  }

  export async function updateProductionRoleCaptureStatus(
    productionRoleCaptureStatus: IProductionRoleCaptureStatus
  ) {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/productionRoleCaptureStatuses/${productionRoleCaptureStatus.id}`,
      productionRoleCaptureStatus
    );

    return response.data;
  }