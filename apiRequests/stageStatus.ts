import { IProductionRoleCaptureStatus } from "@/types/interfaces";
import axios from "axios";

export async function getProductionRoleCaptureStatuses(params?: { company_id?: number, stage_id?: number, is_active?: boolean }) {
  const queryParams = new URLSearchParams();
  if (params?.company_id) queryParams.append("company_id", params.company_id.toString());
  if (params?.stage_id) queryParams.append("stage_id", params.stage_id.toString());
  if (params?.is_active !== undefined) queryParams.append("is_active", params.is_active.toString());

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/productionRoleCaptureStatuses?${queryParams.toString()}`
  );
  return response.data;
}

export async function getStages(company_id?: number) {
  const queryParams = new URLSearchParams();
  if (company_id) queryParams.append("company_id", company_id.toString());

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/stages?${queryParams.toString()}`
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