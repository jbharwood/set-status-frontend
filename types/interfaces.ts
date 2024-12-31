export interface IMessage {
  content: string;
  type: "text" | "image" | "server";
  user: IUser;
}

export type CaptureStatus = "Red" | "Yellow" | "Green" | null;

export interface IProductionRoleCaptureStatus {
  id: number;
  production_role_id: number;
  production_role_name: string;
  production_role_abbreviation: string;
  capture_status_id: number;
  location_id: number;
  notes?: string;
  created_by: string;
  create_time: string;
  last_modified_by: string;
  last_modified_time: string;
}

export interface IProductionRole {
  id: number;
  name: string;
  abbreviation: string;
}

export interface ILocation {
  id: number;
  name: string;
  street_address: string;
  city: string;
  state: string;
  country: string;
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