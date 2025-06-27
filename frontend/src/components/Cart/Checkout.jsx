import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaypalButton from './PaypalButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/slices/checkoutSlice';
import axios from 'axios';



const Checkout = () => {
  const dispatch=useDispatch();
  const {cart,loading,error}=useSelector((state)=>state.cart);
  const [checkoutId, setCheckoutId] = useState(null);
   const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const navigate = useNavigate();
  const {user}=useSelector((state)=>state.auth);
  // ✅ Fixed typo: preventDefault()
  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if(cart && cart.products.length>0){
      const res=await dispatch(createCheckout({
        checkoutItems:cart.products,
        shippingAddress,
        paymentMethod:"Paypal",
        totalPrice:cart.totalPrice,

      }))
      console.log(res.payload._id)
      if(res.payload && res.payload._id){
         setCheckoutId(res.payload._id);
         handlePaymentSuccess(res.payload._id);
      }
      
    }
  };
  useEffect(()=>{
    if(!cart || !cart.products || cart.products.length===0){
      navigate('/')
    }
  },[cart,navigate]);
  const handlePaymentSuccess = async (id) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${id}/pay`,
      {
        paymentStatus: "paid",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    console.log(response.status)
    if (response.status === 200) {
      await handleFinalizeCheckout(id); // ✅ use id passed as argument
    } else {
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

  const handleFinalizeCheckout=async(id)=>{
      try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${id}/finalize`,{},{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          }
        })
        if(response.status===201){
            navigate('/order-confirmation')
        }
        else{
          console.log(response.data)
        }
      } catch (error) {
        console.log(error);
      }
  }
  if(loading){
    return <p>Loading Cart</p>
  }
  if(error){
    return <p>Error:{error}</p>
  }
  if(!cart || !cart.products || cart.products.length===0){
    return <p>Your cart is Empty..!</p>
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user?user.email:""}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mt-6">
            {!checkoutId ? (
              <button type="submit" className="w-full bg-black text-white py-3 rounded">
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                <PaypalButton 
                 amount={"100"}
                 onSuccess={handlePaymentSuccess}
                 onError={(err)=> alert("Payment Failde, Try again")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg mb-4">Order Summary</h3>
            <div className=" py-4 mb-4">
                {cart.products.map((product, index) => (
                <div
                    key={index}
                    className="flex items-start justify-between py-2 "
                >
                    <div className="flex items-start">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-24 object-cover mr-4"
                    />
                    <div>
                        <h3 className="text-md">{product.name}</h3>
                        <p className="text-gray-500">Size: {product.size}</p>
                        <p className="text-gray-500">Color: {product.color}</p>
                    </div>
                    </div>
                    <p className="text-md font-medium">₹{product.price}</p>
                </div>
                ))}
            </div>
            <div className='flex justify-between items-center text-lg mb-4'>
                <p>Subtotal</p>
                <p>₹{cart.totalPrice?.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center text-lg">
                <p>Shipping</p>
                <p>Free</p>
                </div>

                <div className="flex justify-between items-center text-lg mt-4 border-t border-gray-500 pt-4">
                <p>Total</p>
                <p>₹{cart.totalPrice?.toLocaleString()}</p>
            </div>

            </div>

    </div>
  );
};

export default Checkout;
