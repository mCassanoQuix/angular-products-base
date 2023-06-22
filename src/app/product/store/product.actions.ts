import { createActionGroup, emptyProps, props } from "@ngrx/store";
import Product from "src/app/models/product";
import ToBePersisted from '../../models/to-be-persisted.mixin';

export const ProductActions = createActionGroup({
  source: "Product",
  events: {
    "Load Products": emptyProps(),
    "Load Products Success": props<{ products: Product[] }>(),
    "Load Products Failure": props<{ error: unknown }>(),
    "Create Product": props<{ product: ToBePersisted<Product> }>(),
    "Create Product Success": props<{ product: Product }>(),
    "Create Product Failure": props<{ error: unknown }>(),
    "Update Product": props<{ product: Product }>(),
    "Update Product Success": props<{ product: Product }>(),
    "Update Product Failure": props<{ error: unknown }>(),
    "Delete Product": props<{ id: number }>(),
    "Delete Product Success": emptyProps(),
    "Delete Product Failure": props<{ error: unknown }>(),
  },
});
