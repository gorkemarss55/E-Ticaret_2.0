import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProductType } from '../types/Types';


export interface BasketSliceType {
  basket: ProductType[],
  totalAmount: number
}

const initialState: BasketSliceType = {
  basket: localStorage.getItem("basket")
    ? JSON.parse(localStorage.getItem("basket")!)
    : [],
  totalAmount: 0

};

const BasketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state: BasketSliceType, action: PayloadAction<ProductType[]>) => {
      state.basket = action.payload;
    },

    addProductToBasket: (state: BasketSliceType, action: PayloadAction<ProductType>) => {
      // 1. Ürün zaten sepette var mı kontrol et
      const findProduct = state.basket.find(
        (product: ProductType) => product.id === action.payload.id
      );

      if (findProduct) {
        // Ürün zaten var -> count değerini artır
        // count tanımlı değilse en az 1 kabul et
        const existingCount = findProduct.count ?? 1;
        const incomingCount = action.payload.count ?? 1;

        findProduct.count = existingCount + incomingCount;
      } else {
        // Ürün sepette yok (veya sepet boş) -> yeni ürün olarak ekle
        state.basket.push({
          ...action.payload,
          count: action.payload.count ?? 1
        });
      }

      // Güncel sepeti localStorage'a kaydet
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    calculateBasket: (state: BasketSliceType) => {
      let totalAmount: number = 0;
      state.basket && state.basket.map((product: ProductType) => {
        if (product.count) {
          totalAmount += product.price * product.count;
        }
      })
      state.totalAmount = totalAmount;
    },
    removeProductFromBasket: (state: BasketSliceType, action: PayloadAction<number>) => {
      state.basket = [...state.basket.filter((product: ProductType) => product.id !== action.payload)];
      localStorage.setItem("basket", JSON.stringify(state.basket));
    }
  }
});

export const {removeProductFromBasket ,calculateBasket, addProductToBasket, setBasket } = BasketSlice.actions;
export default BasketSlice.reducer;