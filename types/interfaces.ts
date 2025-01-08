export interface IMessage {
  content: string;
  type: "text" | "server";
}

export type CaptureStatus = "Red" | "Yellow" | "Green" | "Grey" | null;

export interface ICaptureStatus {
  id: number;
  name: CaptureStatus;
}

export interface IProductionRoleCaptureStatus {
  id: number;
  productionRoleId: number;
  captureStatusId: number;
  stageId: number;
  notes?: string;
  isActive: boolean;
  createdBy: string;
  createTime: string;
  lastModifiedBy: string;
  lastModifiedTime: string;
  productionRole: IProductionRole;
  captureStatus: ICaptureStatus;
}

export interface IProductionRoleCaptureStatusesHistory extends IProductionRoleCaptureStatus {
  id: number;
  productionRoleCaptureStatusId: number;
}

export interface IProductionRole {
  id: number;
  name: string;
  abbreviation: string;
}

export interface IStage {
  id: number;
  name: string;
  companyId: number;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
}