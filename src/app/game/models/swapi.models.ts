export interface BaseResponse {
  message: string;
}

export interface SwapiResponse<T> extends BaseResponse {
  result: Result<T>;
  description: string;
  uid: string;
}

export interface SwapiPagedResponse<T> extends BaseResponse {
  results: T[],
  total_records: number;
  previous: string;
  next: string;
}

export interface Result<T> {
  properties: T
}

