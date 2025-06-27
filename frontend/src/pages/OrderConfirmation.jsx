import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/cartSlice';
const OrderConfirmation = () => {
    const dispatch=useDispatch();
    const {checkout}=useSelector((state)=>state.checkout);
    const navigate=useNavigate();
    useEffect(()=>{
        if(checkout && checkout._id){
            dispatch(clearCart());
            localStorage.removeItem("cart")
        }else{
            navigate('/my-orders')
        }
    },[checkout,navigate,dispatch]);
  const calculateEstimatedelivery=(creatAt)=>{
        const orderDate=new Date(creatAt);
        orderDate.setDate(orderDate.getDate()+10)
        return orderDate.toLocaleDateString();
  }
  console.log(checkout)
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
        <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>Thank You for Your Order !</h1>
        {checkout && (
            <div className='p-6 rounded-lg border border-gray-300'>
                <div className='flex justify-between mb-20'>
                    <div>
                    <h2 className='text-xl font-semibold'>Order Id:{checkout._id}</h2>
                    <p className='text-gray-500'>
                       Order Date: {new Date(checkout.createdAt).toLocaleDateString()}

                    </p>
                    </div>
                    <div>
                        <p className='text-emerald-700 text-sm'>
                            Estimated Delivery: {" "}
                            {calculateEstimatedelivery(checkout.createdAt)}
                        </p>
                    </div>
                </div>
                <div className='mb-20'>
                    { checkout.checkoutItems?.map((item)=>(
                        <div key={item.productId} className='flex itmes-center mb-4'>
                            <img
                             src={item.image}
                             alt={item.name}
                             className='w-16 h-16 object-cover rounder-md mr-4'
                            />
                            <div>
                                <h4 className='text-md font-semibold'>{item.name}</h4>
                                <p className='text-sm text-gray-500'>
                                    {item.color} | {item.size}
                                </p>

                            </div>
                            <div className='ml-auto text-right'>
                                <p className='text-md'>{item.price}</p>
                                <p className='text-sm text-gray-500'>Quantity:{item.quantity}</p>
                            </div>
                        </div>
                    ))

                    }
                </div>
                <div className='grid grid-cols-2 gap-8'>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Payment</h4>
                        <p className='text-gray-600'>Paypal</p>
                    </div>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
                        <p className='text-gray-600'>{checkout.shippingAddress.address}</p>
                        <p className='text-gray-600'>{checkout.shippingAddress.city},{" "}{checkout.shippingAddress.country}</p>
                    </div>
                </div>
           </div>
        )}
    </div>
  )
}

export default OrderConfirmation