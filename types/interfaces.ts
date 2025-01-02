import { User } from "@clerk/nextjs/server";

export interface IMessage {
  content: string;
  type: "text" | "image" | "server";
  user: User;
}

export type CaptureStatus = "Red" | "Yellow" | "Green" | null;

export interface IProductionRoleCaptureStatus {
  id: number;
  production_role_id: number;
  production_role_name: string;
  production_role_abbreviation: string;
  capture_status_id: number;
  stage_id: number;
  notes?: string;
  is_active: boolean;
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

export interface IStage {
  id: number;
  name: string;
  company_id: number;
  street_address: string;
  city: string;
  state: string;
  country: string;
}