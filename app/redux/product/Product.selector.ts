import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

const selectSelf = (state: RootState) => state;
export const productsSelector = createSelector(
  selectSelf,
  (state) => state.product.products
);

export const productDetailsSelector = createSelector(
  selectSelf,
  (state) => state.product.productDetails
);

export const productUpdatedSelector = createSelector(
  selectSelf,
  (state) => state.product.productUpdated
);

export const productRemovedSelector = createSelector(
  selectSelf,
  (state) => state.product.productRemoved
);

export const productAddedSelector = createSelector(
  selectSelf,
  (state) => state.product.productAdded
);
