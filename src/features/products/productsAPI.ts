import { Product } from "../../types/product"

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json');
  const products = await response.json();

  return products;
}
