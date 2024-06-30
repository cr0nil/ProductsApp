import { useDispatch, useSelector } from "react-redux";
import { productsSelector } from "../redux/product/Product.selector";
import { productActions } from "../redux/product";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Category, Product } from "../redux/product/Product.types";

export const useProducts = (value: string) => {
  const dispatch = useDispatch();
  const productList = useSelector(productsSelector);
  const [filter, setFilter] = useState<Array<Category>>([]);

  useEffect(() => {
    dispatch(productActions.fetchProductsRequest());
  }, []);
  const sortedList = useMemo(() => {
    // Sort the productList based on the selected sort option
    let sortedList: Product[] = productList.slice();
    switch (value) {
      case "name":
        sortedList = sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price":
        sortedList = sortedList.sort((a, b) => a.price - b.price);
        break;
      case "dateAdded":
        sortedList = sortedList.sort(
          (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)
        );
        break;
      case "category":
        sortedList = sortedList.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        break;
      default:
        sortedList = sortedList;
        break;
    }
    if (filter.length === 0) return sortedList;
    sortedList = sortedList.filter((item) => filter.includes(item.category));
    return sortedList;
  }, [value, filter, productList]);

  const setFilterHandler = useCallback(
    (val: Category) => {
      filter.find((item) => item === val)
        ? setFilter(filter.filter((item) => item !== val))
        : setFilter([...filter, val]);
    },
    [filter]
  );
  return {
    products: sortedList,
    filter: filter,
    setFilterHandler,
    removeProduct: () => {},
  };
};
