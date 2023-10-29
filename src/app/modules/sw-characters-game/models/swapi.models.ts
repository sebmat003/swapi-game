export interface SwapiResponse<T> {
  result: Result<T>;
  description: string;
  uid: string;
}

export interface SwapiPagedResponse<T> {
  totalRecords: number;
}

export interface Result<T> {
  properties: T;
}
