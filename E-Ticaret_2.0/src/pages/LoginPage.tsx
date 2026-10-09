
import '../css/RegisterPage.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {  IoPersonCircleSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { registerPageSchema } from '../schemas/RegisterPageSchema';
import '../css/LoginPage.css';
import LoginPageService from '../services/LoginPageService';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/AppSlice';
import type { UserType } from '../types/Types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    interface CheckUserType{
        result:boolean,
        currentUser:UserType | null
    }
    
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const checkUser=(userList:UserType[],username:string,password:string)=>{
        const response:CheckUserType = { result:false,currentUser:null}
        userList.forEach((user:UserType)=>{
            if(user.username===username && user.password===password){
                response.result=true;
                response.currentUser=user;
            }
        })
        return response;
    }
    const submit = async(values:any,action:any) => {
        try {
            dispatch(setLoading(true));
           const response:UserType[]=await LoginPageService.login();
           if(response){
            const checkUserResponse:CheckUserType=  checkUser(response,values.username,values.password);
            if(checkUserResponse.result && checkUserResponse.currentUser){
                //kullanıcı adı ve şifre doğru
                dispatch(setCurrentUser(checkUserResponse.currentUser));
                localStorage.setItem("currentUser",JSON.stringify(checkUserResponse.currentUser));
                navigate("/");
            }else{
                //yanlış
                toast.error("Kullanıcı adı veya şifre yanlış")
            }
           }
            
        } catch (error) {
            toast.error("Giriş yapılırken hata oluştu!"+error)
        }finally{
             dispatch(setLoading(false));
        }
    }

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: submit,
        validationSchema: registerPageSchema
    });

    const clear =()=>{
        resetForm();
    }

    return (
        <div className='login'>
            <div >
                <form onSubmit={handleSubmit}>
                    <div className='form-div'>
                        <TextField
                            id="username"
                            placeholder='kullanıcı adı'
                            value={values.username}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            < IoPersonCircleSharp />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="outlined"
                            helperText={errors.username && <span style={{ color: 'red' }}>{errors.username} </span>}
                        />
                        <TextField
                            id="password"
                            placeholder='şifre'
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <  FaLock />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="outlined"
                            helperText={errors.password && <span style={{ color: 'red' }}>{errors.password} </span>}
                        />
                        <div className='buton'>
                            <Button type='submit' sx={{ textTransform: 'none', height: '35px', bgcolor: '#c5cdd1', color: '#4c4ce0' }} variant='contained'>Giriş Yap</Button>
                            <Button onClick={clear} sx={{ textTransform: 'none', height: '35px', bgcolor: '#c5cdd1', color: '#4c4ce0' }} variant='contained'>Temizle</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage