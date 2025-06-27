import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import register from '../assets/register.webp'
import {registerUser} from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';
const Register = () => {
  const dispatch=useDispatch();
     const navigate = useNavigate();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
  
    const redirect = new URLSearchParams(location.search).get("redirect") || '/';
    const isChecoutRedirect = redirect.includes("checkout");
  
    useEffect(() => {
      if (user) {
        if (cart?.products.length > 0 && guestId) {
          dispatch(mergeCart({ guestId, userId: user._id })).then(() => {
            navigate(isChecoutRedirect ? "/checkout" : "/");
          });
        } else {
          navigate(isChecoutRedirect ? "/checkout" : "/");
        }
      }
    }, [user, guestId, cart, navigate, isChecoutRedirect, dispatch]);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const handleSubmit=(e)=>{
       e.preventDefault();
       dispatch(registerUser({name,email,password}))
  }
  return (
    <div className='flex'>
         <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
            <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border border-gray-100 shadow-sm'>
                <div className='flex justify-center mb-6'>
                    <h2 className='text-xl font-medium'>WaveWare</h2>
                </div>
                <h2 className='text-2xl font-bold text-center mb-6'>Hey there ! 👋🏻 </h2>
                <p className='text-center mb-6'>
                    Enter your name , username and password to Register
                </p>
                <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Name</label>
                    <input type='text' value={name} onChange={(e)=>setName(e.target.value)} className='w-full p-2 border border-gray-300 rounded' placeholder='Enter the email address'/>
                    
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Email</label>
                    <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full p-2 border border-gray-300 rounded' placeholder='Enter the email address'/>
                    
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-semibold mb-2'>Password</label>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full p-2 border border-gray-300  rounded' placeholder='Enter the password'/>
                    
                </div>
                <button type='sumbit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition '>
                    Sign Up
                </button>
                <p className='mt-6 text-center text-sm'>You have an account ? 
                    <Link to="/login"
                       className='text-blue-500'
                    >  Login</Link>
                </p>
                

            </form>
            
         </div>
         <div className='hidden md:block w-1/2 bg-gray-800'>
                    <div className='h-full flex flex-col justify-center items-center'>
                        <img src={register} className='h-[750px] w-full object-cover' />
                    </div>
        </div>
    </div>
  )
}

export default Register