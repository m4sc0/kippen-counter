export interface DetailResponse<T = undefined> {
  detail: string;
  status: number;
  data?: T;
}

export interface Counter {
  id: number;
  name: string;
  value: number;
  reset_value: number;
  reset_time: Date | null;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  type: string;
}
