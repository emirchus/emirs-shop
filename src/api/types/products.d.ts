export type GetProductsParams = {
  title?: string | null;
  categoryId?: number | null;
  offset?: number | null;
  limit?: number | null;
} & (
  | {
      price?: number | null;
    }
  | {
      price_max?: number | null;
      price_min?: number | null;
    }
);
export type GetBestSellersParams = {
  categoryId?: number | null;
};

export interface CreateProductPayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {}
