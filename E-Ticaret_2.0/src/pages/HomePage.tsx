import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ProductType, UserType } from '../types/Types';
import { setCurrentUser, setLoading, setProducts } from '../redux/AppSlice';
import productService from '../services/ProductService';
import { toast } from 'react-toastify';
import type { RootState } from '../redux/Store';
import ProductCard from '../components/ProductCard';
import Container from '@mui/material/Container';
import Categories from '../components/Categories';

function HomePage() {

  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.app);

  const getAllProduct = async () => {
    try {
      dispatch(setLoading(true));
      const response: ProductType[] = await productService.getAllProduct();//productservicedeki getAllProduct'ı çağırırız
      if (response) {
        dispatch(setProducts(response))//AppSlice'a ürünleri doldurduk
      }
    } catch (error) {
      toast.error("Ürünler getirilirken hat oluştu" + error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    getAllProduct();
  }, [])
  useEffect(() => {
    const result = localStorage.getItem("currentUser")
    if (result) {
      const currentUser: UserType = JSON.parse(result) as UserType;
      dispatch(setCurrentUser(currentUser));
    }
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Categories />
      <Container maxWidth="xl">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: 'center', flexWrap: 'wrap' }}>
          {
            products && products.map((product: ProductType, index: number) => (
              <ProductCard key={index} product={product} />
            ))
          }
        </div>
      </Container>
    </div>
  )
}

export default HomePage