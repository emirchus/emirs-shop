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
