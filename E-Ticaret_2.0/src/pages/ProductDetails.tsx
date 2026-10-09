import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/AppSlice';
import { toast } from 'react-toastify';
import ProductService from '../services/ProductService';
import type { ProductType } from '../types/Types';
import Button from '@mui/material/Button';
import { addProductToBasket } from '../redux/BasketSlice';
function ProductDetails() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<ProductType>()
    const [count,setCount]=useState<number>(0);
    const increase=()=>{
        setCount(count+1);
    }
    const decrease=()=>{
        if(count>0){
            setCount(count-1);
        }
    }
    const getProductById = async (productId: number) => {
        try {
            dispatch(setLoading(true));
            const product: ProductType = await ProductService.getByProductById(productId);
            setProduct(product)
        } catch (error) {
            toast.error("Bir hata oluştu" + error)
        } finally {
            dispatch(setLoading(false));
        }
    }
    const addBasket =()=>{
        if(product){
             const payload:ProductType={
            ...product,
            count:count
        }
         dispatch(addProductToBasket(payload));
        }
        toast.success("Ürün başarıyla eklendi")
      
    }

    useEffect(() => {
        getProductById(Number(productId));
    }, [])
    return (
        <Container maxWidth="lg">
            {product && <>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start" }}>
                    <div>
                        <img src={product.image} width={300} height={500} alt="" />
                    </div>
                    <div style={{ marginTop: "75px", fontSize: "30px", fontWeight: "bold" }}>
                        {product.title}
                        <div style={{ marginTop: "75px", fontSize: "20px", fontWeight: "normal" }}>
                            {product.description}
                            <div style={{ marginTop: "75px", fontSize: "30px", fontWeight: "bold" }}>
                                {product.price}$
                            </div>
                            <div style={{marginTop:"30px"}}>
                                <span onClick={()=>increase()} style={{ fontSize: "30px", fontWeight: "bold",cursor:"pointer",marginRight:"15px"}}>+</span>
                                 <span style={{ fontSize: "30px", fontWeight: "bold",cursor:"pointer",marginRight:"15px"}}>{count}</span>
                                  <span onClick={()=>decrease()} style={{ fontSize: "30px", fontWeight: "bold",cursor:"pointer",marginRight:"20px"}}>-</span>
                            </div>
                            <div>
                                <Button onClick={addBasket} color='info' variant='contained' size="small"  sx={{textTransform:'none',marginTop:'20px'}}>Sepete Ekle</Button>
                            </div>
                        </div>
                    </div>

                </div>
            </>}
        </Container>
    )
}

export default ProductDetails