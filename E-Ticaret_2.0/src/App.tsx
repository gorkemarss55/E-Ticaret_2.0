import { useEffect, useState } from 'react'
import './App.css'
import RouterConfig from './config/RouterConfig'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/Store';
import type { ProductType, UserType } from './types/Types';
import ProductService from './services/ProductService';
import { setCurrentUser, setProducts } from './redux/AppSlice';
import { setBasket } from './redux/BasketSlice';
import BasketDetails from './components/BasketDetails';
function App() {
  const { currentUser } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();

  const getAllProduct = async () => {
    const product: ProductType[] = await ProductService.getAllProduct();
    dispatch(setProducts(product));

  }

  useEffect(() => {
    getAllProduct();
  }, [])
  useEffect(() => {
    const currentUserString: string | null = localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser: UserType = JSON.parse(currentUserString) as UserType;
      dispatch(setCurrentUser(currentUser))
    }
  }, [])
  useEffect(() => {
    const basketString= localStorage.getItem("basket");
    if(basketString){
      const basket:ProductType[]=JSON.parse(basketString)as ProductType[]
      dispatch(setBasket(basket))
    }
  },[])
  return (
    <div>
    
  <div>
    {currentUser && <Navbar />}
    <RouterConfig />

    <ToastContainer autoClose={2500} />
    <Spinner />
    <BasketDetails />
  </div>
)
    </div>
  )
}

export default App
