import { createAction } from "@reduxjs/toolkit";
import { Product } from "./Product.types";

export const productActionTypes = {
  FETCH_PRODUCTS_REQUEST: "product/fetchProductsRequest",
  FETCH_PRODUCTS_FAIL: "product/fetchProductsFail",
  FETCH_PRODUCTS_SUCCESS: "product/fetchProductsSuccess",
  ADD_PRODUCT_REQUEST: "product/addProduct",
  ADD_PRODUCT_FAIL: "product/addProductFail",
  ADD_PRODUCT_SUCCESS: "product/addProductSuccess",
  FETCH_PRODUCT_DETAILS_REQUEST: "product/fetchProductDetailsRequest",
  FETCH_PRODUCT_DETAILS_FAIL: "product/fetchProductDetailsFail",
  FETCH_PRODUCT_DETAILS_SUCCESS: "product/fetchProductDetailsSuccess",
  UPDATE_PRODUCT_REQUEST: "product/updateProductRequest",
  UPDATE_PRODUCT_FAIL: "product/updateProductFail",
  UPDATE_PRODUCT_SUCCESS: "product/updateProductSuccess",
  DELETE_PRODUCT_REQUEST: "product/deleteProductRequest",
  DELETE_PRODUCT_FAIL: "product/deleteProductFail",
  DELETE_PRODUCT_SUCCESS: "product/deleteProductSuccess",

  LOGOUT_SUCCESS: "product/logoutSuccess",
};

export const productActions = {
  fetchProductsRequest: createAction(productActionTypes.FETCH_PRODUCTS_REQUEST),
  fetchProductsSuccess: createAction<any>(
    productActionTypes.FETCH_PRODUCTS_SUCCESS
  ),
  fetchProductsFail: createAction<Error>(
    productActionTypes.FETCH_PRODUCTS_FAIL
  ),

  addProductRequest: createAction<Product>(
    productActionTypes.ADD_PRODUCT_REQUEST
  ),
  addProductSuccess: createAction<any>(productActionTypes.ADD_PRODUCT_SUCCESS),
  addProductFail: createAction<Error>(productActionTypes.ADD_PRODUCT_FAIL),

  fetchProductDetailsRequest: createAction<number>(
    productActionTypes.FETCH_PRODUCT_DETAILS_REQUEST
  ),
  fetchProductDetailsSuccess: createAction<Product>(
    productActionTypes.FETCH_PRODUCT_DETAILS_SUCCESS
  ),
  fetchProductDetailsFail: createAction<Error>(
    productActionTypes.FETCH_PRODUCT_DETAILS_FAIL
  ),

  updateProductRequest: createAction<Product>(
    productActionTypes.UPDATE_PRODUCT_REQUEST
  ),
  updateProductSuccess: createAction<Product>(
    productActionTypes.UPDATE_PRODUCT_SUCCESS
  ),
  updateProductFail: createAction<Error>(
    productActionTypes.UPDATE_PRODUCT_FAIL
  ),

  deleteProductRequest: createAction<number>(
    productActionTypes.DELETE_PRODUCT_REQUEST
  ),
  deleteProductSuccess: createAction(productActionTypes.DELETE_PRODUCT_SUCCESS),
  deleteProductFail: createAction<Error>(
    productActionTypes.DELETE_PRODUCT_FAIL
  ),

  logoutSuccess: createAction(productActionTypes.LOGOUT_SUCCESS),
};
