import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import kartalicon from '../images/kartal resmi.jpg'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, setDrawer, setFilterProduct, setLoading, setProducts } from '../redux/AppSlice';
import { toast } from 'react-toastify';
import type { ProductType } from '../types/Types';
import productService from '../services/ProductService';
import { FaShoppingBasket } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import type { RootState } from '../redux/Store';


export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {basket}=useSelector((state:RootState)=>state.basket)

    const logout = () => {
        localStorage.removeItem("currentUser");
        dispatch(setCurrentUser(null));
        navigate("/login");
        toast.success("Çıkış başarılı");

    }

    const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            dispatch(setLoading(true))
            if (e.target.value) {
                dispatch(setFilterProduct(e.target.value))
            } else {
                const products: ProductType[] = await productService.getAllProduct();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("Filtereleme işlemi başarısız.");
        } finally {
            dispatch(setLoading(false))
        }

    }
    const openDrawer=()=>{
            dispatch(setDrawer(true));
        }
    return (

        <AppBar position="static" sx={{ backgroundColor: '#7385e1' }}>
            <Toolbar>
                <IconButton
                    onClick={() => navigate("/")}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <img src={kartalicon} style={{ height: '60px', width: '60px' }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Kartal Yuvası
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilter(e)}
                        sx={{
                            width: '300px', marginBottom: '25px', marginRight: '20px'
                        }}
                        id="search"
                        placeholder='birşey ara'

                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">

                                    </InputAdornment>
                                ),
                                style: {
                                    color: 'white',
                                    borderBottom: '1px solid white'
                                }
                            },
                        }}
                        variant="outlined"
                    />
                    <Badge sx={{cursor:"pointer"}} onClick={ openDrawer} badgeContent={basket.length} color="secondary">
                        
                     <FaShoppingBasket style={{ margin: "0px 10px", cursor: "pointer", fontSize: "20px" }} />
                    </Badge>
                   
                    <Button onClick={logout} color="inherit">Çıkış Yap</Button>
                </div>
            </Toolbar>
        </AppBar>

    );
}
