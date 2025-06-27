import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // 🛠️ added useLocation
import login from '../assets/login.webp';
import { loginUser } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';
import { toast } from 'sonner';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // 🛠️ added

  const { user, guestId, error, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || '/';
  const isCheckoutRedirect = redirect.includes("checkout");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 Show toast when error occurs
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Handle redirect on login success
  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, userId: user._id })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className='flex'>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12'>
        <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 rounded-lg border border-gray-100 shadow-sm'>
          <div className='flex justify-center mb-6'>
            <h2 className='text-xl font-medium'>WaveWare</h2>
          </div>
          <h2 className='text-2xl font-bold text-center mb-6'>Hey there ! 👋🏻 </h2>
          <p className='text-center mb-6'>
            Enter your username and password to Login
          </p>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-2 border border-gray-300 rounded' placeholder='Enter the email address' />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Password</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-2 border border-gray-300  rounded' placeholder='Enter the password' />
          </div>
          <button type='submit' disabled={loading} className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <p className='mt-6 text-center text-sm'>Don't have an account?
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500'>
              {" "}Register
            </Link>
          </p>
        </form>
      </div>
      <div className='hidden md:block w-1/2 bg-gray-800'>
        <div className='h-full flex flex-col justify-center items-center'>
          <img src={login} className='h-[750px] w-full object-cover' />
        </div>
      </div>
    </div>
  );
};

export default Login;
