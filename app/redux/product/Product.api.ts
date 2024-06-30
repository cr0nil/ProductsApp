import { api } from "../../api";
import { promiseWrapper } from "../../utils/PromiseWrapper";
import { Product } from "./Product.types";

export const fetchProductApi = async (): Promise<[Array<Product>, Error]> => {
  return promiseWrapper(api.get(`/products`));
};

export const addProductApi = async (data: Product) => {
  return promiseWrapper(api.post(`/products`, data));
};

export const fetchProductDetailsApi = async (
  id: number
): Promise<[Product, Error]> => {
  return promiseWrapper(api.get(`/products/${id}`));
};

export const updateProductApi = async (data: Product) => {
  return promiseWrapper(api.put(`/products/${data.id}`, data));
};

export const deleteProductApi = async (id: number) => {
  return promiseWrapper(api.delete(`/products/${id}`));
};
