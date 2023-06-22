import { createFeature, createReducer, on } from "@ngrx/store";
import Product from "src/app/models/product";

import { ProductActions } from "./product.actions";

export const productFeatureKey = "product";

export interface State {
  products: Product[];
  loading: boolean;
}

const initialState: State = {
  products: [],
  loading: false,
};

export const productsFeature = createFeature({
  name: productFeatureKey,
  reducer: createReducer(
    initialState,
    on(ProductActions.loadProducts, (state) => ({
      ...state,
      products: [],
      loading: true,
    })),
    on(ProductActions.loadProductsSuccess, (state, { products }) => ({
      ...state,
      products,
      loading: false,
    }))
  ),
});

export const {
  name,
  reducer,
  selectProductState,
  selectProducts,
  selectLoading,
} = productsFeature;
