export interface GetDatumProps {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}

export interface GetProductProps {
  productId: number | null;
}

export interface GetCommentsProps {
  productId: number | null;
  limit: string;
}

export interface TotalProductsData {
  totalCount: number;
  list: {
    createdAt: string;
    favoriteCount: number;
    ownerId: number;
    images: [string];
    tags: [string];
    price: number;
    description: string;
    name: string;
    id: number;
  }[];
}

export interface SpecificProductData {
  createdAt: string;
  favoriteCount: number;
  ownerId: number;
  images: [string];
  tags: [string];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
}

export interface SpecificCommentsData {
  nextCursor: number;
  list: [
    {
      writer: {
        image: string;
        nickname: string;
        id: number;
      };
      updatedAt: string;
      createdAt: string;
      content: string;
      id: number;
    }
  ];
}
