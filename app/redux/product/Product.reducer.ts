import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./Product.types";

interface ProductState {
  pending: boolean;
  products: Product[];
  productDetails?: Product;
  productAdded: boolean | null;
  productUpdated: boolean | null;
  productRemoved: boolean | null;
}

export const initialStateProducts: ProductState = {
  pending: false, // to do - add loader to screen
  products: [],
  productDetails: undefined,
  productAdded: null,
  productUpdated: null,
  productRemoved: null,
  // Set your initial state values here
};
const reducer = {
  //Chargers
  fetchProductsRequest: (state: ProductState) => {
    state.pending = true;
    state.productAdded = null;
    state.productUpdated = null;
    state.productRemoved = null;
  },
  fetchProductsSuccess: (
    state: ProductState,
    { payload }: PayloadAction<any>
  ) => {
    state.pending = false;
    state.products = payload;
  },
  fetchProductsFail: (state: ProductState) => {
    state.pending = false;
    state.products = [];
  },
  //Add Product
  addProductRequest: (state: ProductState) => {
    state.pending = true;
    state.productAdded = null;
  },
  addProductSuccess: (state: ProductState) => {
    state.pending = false;
    state.productAdded = true;
  },
  addProductFail: (state: ProductState) => {
    state.pending = false;
    state.productAdded = false;
  },

  //Product Details
  fetchProductDetailsRequest: (state: ProductState) => {
    state.pending = true;
  },
  fetchProductDetailsSuccess: (
    state: ProductState,
    { payload }: PayloadAction<any>
  ) => {
    state.pending = false;
    state.productDetails = payload;
  },
  fetchProductDetailsFail: (state: ProductState) => {
    state.pending = false;
    state.productDetails = undefined;
  },

  //Update Product
  updateProductRequest: (state: ProductState) => {
    state.pending = true;
    state.productUpdated = null;
  },
  updateProductSuccess: (state: ProductState) => {
    state.pending = false;
    state.productUpdated = true;
  },
  updateProductFail: (state: ProductState) => {
    state.pending = false;
    state.productUpdated = false;
  },

  //Delete Product
  deleteProductRequest: (state: ProductState) => {
    state.pending = true;
    state.productRemoved = null;
  },
  deleteProductSuccess: (state: ProductState) => {
    state.pending = false;
    state.productRemoved = true;
  },
  deleteProductFail: (state: ProductState) => {
    state.pending = false;
    state.productRemoved = false;
  },
};

const productSlice = createSlice({
  name: "product",
  initialState: initialStateProducts,
  reducers: reducer,
});

export default productSlice.reducer;
