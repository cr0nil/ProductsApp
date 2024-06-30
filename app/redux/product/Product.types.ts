export enum Category {
  Electronics = "Electronics",
  Clothing = "Clothing",
  Food = "Food",
}
export interface Product {
  name: string;
  price: number;
  category: Category;
  dateAdded: Date;
  id?: number;
}
