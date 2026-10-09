import React from 'react'
import type { ProductType } from '../types/Types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps{
  product:ProductType
}


function ProductCard(props:ProductCardProps) {
  const {id,title,price,description,category,image,rating}=props.product;
  const navigate=useNavigate();
  return (
    
     <Card sx={{curser:'pointer', boxShadow:'1px 5px 5px lightgrey', width:'330px',height:'550px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',margin:'60px 10px' }}>
      <CardActionArea onClick={()=> navigate("/product-detail/"+id)}>
      <img src={image} alt="" width={250} height={250}/>
      
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {title.substring(0,50)}...
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description.substring(0,150)}...
          </Typography>
        </CardContent>
        <div><h2 style={{display:'flex',alignItems:'center',justifyContent:'center'}}>{price} $</h2></div>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard