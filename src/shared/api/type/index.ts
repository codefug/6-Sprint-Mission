export interface GetDatumProps {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword: string;
}

export interface GetProductProps {
  productId: number | null;
}

export interface GetCommentsProps {
  productId: number | null;
  limit: string;
}
