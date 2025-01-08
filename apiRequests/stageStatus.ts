import { IProductionRoleCaptureStatus } from "@/types/interfaces";
import axios from "axios";

export async function getProductionRoleCaptureStatuses(params?: { companyId?: number, stageId?: number, isActive?: boolean }) {
  const queryParams = new URLSearchParams();
  if (params?.companyId) queryParams.append("companyId", params.companyId.toString());
  if (params?.stageId) queryParams.append("stageId", params.stageId.toString());
  if (params?.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/productionRoleCaptureStatuses?${queryParams.toString()}`
  );
  return response.data;
}

export async function getProductionRoleCaptureStatusById(id: number) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/productionRoleCaptureStatuses/${id.toString()}`
  );
  return response.data;
}

export async function getProductionRoleCaptureStatusesHistory(params: { companyId: number, stageId: number }) {
  const queryParams = new URLSearchParams();
  const { companyId, stageId } = params;

  queryParams.append("companyId", companyId.toString());
  queryParams.append("stageId", stageId.toString());
         
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/productionrolecapturestatuseshistory?${queryParams.toString()}`
  );
  return response.data;
}

export async function getStages(companyId?: number) {
  const queryParams = new URLSearchParams();
  if (companyId) queryParams.append("companyId", companyId.toString());

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stages?${queryParams.toString()}`
  );
  return response.data;
}

export async function getStageCaptureStatus(stageId: number, companyId: number) {
  const queryParams = new URLSearchParams();
  queryParams.append("stageId", stageId.toString());
  queryParams.append("companyId", companyId.toString());

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stageCaptureStatus?${queryParams.toString()}`
  );
  return response.data;
}

export async function updateProductionRoleCaptureStatus(
  productionRoleCaptureStatus: IProductionRoleCaptureStatus
) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/productionRoleCaptureStatuses/${productionRoleCaptureStatus.id}`,
    productionRoleCaptureStatus
  );
  return response.data;
}