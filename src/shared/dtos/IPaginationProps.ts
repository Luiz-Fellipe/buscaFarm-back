export interface PaginationProps {
  pageStart: number;
  pageLength: number;
  search: string;
}

export interface ResponsePaginationProps {
  data: Object;
  count: number;
}
