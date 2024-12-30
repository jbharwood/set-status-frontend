export interface IMessage {
  content: string;
  type: "text" | "image" | "server";
  user: IUser;
}

export interface IProductionRoleCaptureStatus {
  id: number;
  production_role_id: number;
  capture_status_id: number;
  location_id: number;
  notes?: string;
  created_by: string;
  create_time: string;
  last_modified_by: string;
  last_modified_time: string;
}

export interface IUser {
  id?: string;
  name?: string | null;
  current?: {
    name?: string, 
    id?: string
  }
  room?: string;
  image?: string;
}