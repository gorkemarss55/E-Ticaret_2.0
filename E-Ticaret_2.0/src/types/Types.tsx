export interface UserType{
    id:string,
    username:string,
    password:string,
    balance:number
}

export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;  
  category: string;
  rating: RaitingType;
  count?:number;
}
interface RaitingType{
  rate:number,
  count:number
}

