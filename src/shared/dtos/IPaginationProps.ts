export interface PaginationProps {
  pharmacieId?: string;
  pageStart: number;
  pageLength: number;
  search: string;
}

export interface ResponsePaginationProps {
  data: Object;
  count: number;
}
