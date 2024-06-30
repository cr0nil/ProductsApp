import { takeLatest, put, call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { productActionTypes, productActions } from "./Product.action";
import {
  addProductApi,
  deleteProductApi,
  fetchProductApi,
  fetchProductDetailsApi,
  updateProductApi,
} from "./Product.api";
import { Product } from "./Product.types";

function* fetchProductsSaga() {
  const [response, error]: [any, Error] = yield call(fetchProductApi);
  if (error) {
    yield put(productActions.fetchProductsFail(error));
  } else {
    yield put(productActions.fetchProductsSuccess(response));
  }
}

function* addProductSaga({ payload }: PayloadAction<Product>) {
  const [response, error]: [any, Error] = yield call(addProductApi, payload);
  if (error) {
    yield put(productActions.addProductFail(error));
  } else {
    yield put(productActions.addProductSuccess(response));
    yield put(productActions.fetchProductsRequest());
  }
}

// product deatils saga
function* fetchProductDetailsSaga({ payload }: PayloadAction<number>) {
  const [response, error]: [Product, Error] = yield call(
    fetchProductDetailsApi,
    payload
  );
  if (error) {
    yield put(productActions.fetchProductDetailsFail(error));
  } else {
    yield put(productActions.fetchProductDetailsSuccess(response));
  }
}
// update product saga
function* updateProductSaga({ payload }: PayloadAction<Product>) {
  const [response, error]: [any, Error] = yield call(updateProductApi, payload);
  if (error) {
    yield put(productActions.updateProductFail(error));
  } else {
    yield put(productActions.updateProductSuccess(response));
    yield put(productActions.fetchProductsRequest()); // todo remove refetch api - magage in reducer
  }
}
// delete product saga
function* deleteProductSaga({ payload }: PayloadAction<number>) {
  const [response, error]: [any, Error] = yield call(deleteProductApi, payload);
  if (error) {
    yield put(productActions.deleteProductFail(error));
  } else {
    yield put(productActions.deleteProductSuccess(response));
    yield put(productActions.fetchProductsRequest()); // todo remove refetch api - magage in reducer - fileter product list
  }
}

export default [
  takeLatest(productActionTypes.FETCH_PRODUCTS_REQUEST, fetchProductsSaga),
  takeLatest(productActionTypes.ADD_PRODUCT_REQUEST, addProductSaga),
  takeLatest(
    productActionTypes.FETCH_PRODUCT_DETAILS_REQUEST,
    fetchProductDetailsSaga
  ),
  takeLatest(productActionTypes.UPDATE_PRODUCT_REQUEST, updateProductSaga),
  takeLatest(productActionTypes.DELETE_PRODUCT_REQUEST, deleteProductSaga),
];
