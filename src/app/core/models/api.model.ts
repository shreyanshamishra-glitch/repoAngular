export interface EndpointDescriptor {
  id: string;
  name: string;
  method: string;
  path: string;
  description: string;
  queryParams: string[];
}

export interface PaginationConfig {
  maxPageSize: number;
  defaultPageSize: number;
}

export interface AttributeConfig {
  label: string;
  type: string;
  required: boolean;
  min: number | null;
  max: number | null;
  allowedValues: string[] | null;
}

export interface ApiMetadata {
  endpoints: EndpointDescriptor[];
  pagination: PaginationConfig;
  attributes: Record<string, AttributeConfig>;
  defaultSymbols: string[];
}

export interface AdminUser {
  username: string;
  role: string;
  displayName: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  maxPageSize: number;
}

export interface GenerateDummyOrdersRequest {
  count: number;
  useLiveQuotes: boolean;
}
