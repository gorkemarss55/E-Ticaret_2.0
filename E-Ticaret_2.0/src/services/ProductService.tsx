import axios, { type AxiosResponse } from "axios";
import type { ProductType } from "../types/Types";

class ProductService{
    BASE_URL="https://dummyjson.com";
    getAllProduct():Promise<ProductType[]>{

        return new Promise((resolve:any,reject:any)=>{
            axios.get((`${this.BASE_URL}/products`))
           .then((response: AxiosResponse<any, any>) => {
          
          const formattedProducts: ProductType[] = response.data.products.map(
            (item: any) => ({
              id: item.id,
              title: item.title,
              price: item.price,
              description: item.description,
              category: item.category,
              image: item.thumbnail, 
              rating: {
                rate: item.rating,
                count: item.stock,
              },
            })
          );

          resolve(formattedProducts); 
        })
        .catch((error: any) => reject(error));
    });
  }

  async getByProductById(productId: number): Promise<ProductType> {
  const response = await axios.get(`${this.BASE_URL}/products/${productId}`);
  const item = response.data;

  return {
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    category: item.category,
    image: item.thumbnail || item.image,
    rating: {
      rate: typeof item.rating === 'object' ? item.rating.rate : item.rating,
      count: typeof item.rating === 'object' ? item.rating.count : item.stock,
    },
  };
}
}

export default new ProductService();