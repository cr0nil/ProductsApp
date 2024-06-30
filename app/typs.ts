export enum Route {
  Login = "Login",
  Register = "Register",
  Product = "Product",
  AddProduct = "AddProduct",
  Home = "Home",
  EditProduct = "EditProduct",
  ProductStack = "ProductStack",
}
export type ProductStackParamList = {
  [Route.Product]: undefined;
  [Route.AddProduct]: undefined;
  [Route.EditProduct]: { idProduct: number };
};
