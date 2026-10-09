import axios, { type AxiosResponse } from "axios";
import type { ProductType } from "../types/Types";

interface CategoryResponse {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
}

class CategoriesService{

    BASE_URL="https://dummyjson.com";

    async getAllCategories(): Promise<string[]> {
    const response = await axios.get<string[]>(
      `${this.BASE_URL}/products/category-list`
    );
    return response.data;
  }

  async getProductByCategoryName(categoryName: string): Promise<ProductType[]> {
    // 1. Endpoint: category-list yerine category
    const response = await axios.get<CategoryResponse>(
      `${this.BASE_URL}/products/category/${categoryName}`
    );
    // 2. Doğrudan response.data değil, içindeki products dizisi:
    return response.data.products;
  }
}

export default new CategoriesService();//demin bu kısmı eklemediğim için Categories kısmına import ederken sorun yaşadım