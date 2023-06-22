import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { ProductsService } from "../../services/products.service";
import { ProductActions } from "./product.actions";
import { of } from "rxjs";

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      exhaustMap(() =>
        this.productsService.getAll().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  refreshProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ProductActions.createProductSuccess,
        ProductActions.updateProductSuccess,
        ProductActions.deleteProductSuccess
      ),
      map(() => ProductActions.loadProducts())
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      exhaustMap(({ product }) =>
        this.productsService.createOne(product).pipe(
          map((createdProduct) => ProductActions.createProductSuccess({ product: createdProduct })),
          catchError((error) =>
            of(ProductActions.createProductFailure({ error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      exhaustMap(({ product }) =>
        this.productsService.updateOne(product).pipe(
          map(() => ProductActions.updateProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.updateProductFailure({ error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      exhaustMap(({ id }) =>
        this.productsService.deleteOne(id).pipe(
          map(() => ProductActions.deleteProductSuccess()),
          catchError((error) =>
            of(ProductActions.deleteProductFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly productsService: ProductsService
  ) {}
}
