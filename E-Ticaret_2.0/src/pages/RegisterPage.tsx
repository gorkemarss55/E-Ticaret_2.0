import React from 'react'
import '../css/RegisterPage.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoColorFill, IoPersonCircleSharp } from "react-icons/io5";
import { FaLock } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { registerPageSchema } from '../schemas/RegisterPageSchema';
import RegisterPagesServices from '../services/RegisterPagesServices';
import type { UserType } from '../types/Types';
import  {  ToastContainer ,  toast  }  from  'react-toastify' ;
import { useNavigate } from 'react-router-dom';
function RegisterPage() {

    const navigate =useNavigate();
    const submit = async(values:any,actions:any)=>{
        try {
            const payload :UserType={
                id:String(Math.floor(Math.random()*99)),
                username:values.username,
                password:values.password,
                balance:3000
            }
          const response= await RegisterPagesServices.register(payload)
          if(response){
            toast.success("Kullanıcı kaydedildi.")
            navigate("/login");
            clear();
          }
        } catch (error) {
            toast.error("Kullanıcı kaydedilemedi")
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

        <div className='register'>
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
                            helperText={errors.username &&  <span style={{color:'red'}}>{errors.username} </span>}
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
                            helperText={errors.password && <span style={{color:'red'}}>{errors.password} </span>}
                        />
                        <div className='buton'>
                            <Button type='submit' sx={{ textTransform: 'none', height: '35px', bgcolor: '#c5cdd1', color: '#4c4ce0' }} variant='contained'>Kaydol</Button>
                            <Button onClick={clear} sx={{ textTransform: 'none', height: '35px', bgcolor: '#c5cdd1', color: '#4c4ce0' }} variant='contained'>Temizle</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage