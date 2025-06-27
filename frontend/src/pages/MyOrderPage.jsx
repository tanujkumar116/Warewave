import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slices/orderSlice';

const MyOrderPage = () => {
  const navigate = useNavigate(); // ✅ Correct placement
  const dispatch=useDispatch();
  const {orders,loading,error}=useSelector((state)=>state.order)
  const handlerowclick = (id) => {
    navigate(`/order/${id}`); // ✅ just use it here
  };
  useEffect(()=>{
    dispatch(fetchUserOrders());
  },[dispatch])
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg ">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3">Image</th>
              <th className="py-2 px-4 sm:py-3">Order ID</th>
              <th className="py-2 px-4 sm:py-3">Created</th>
              <th className="py-2 px-4 sm:py-3">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3">Items</th>
              <th className="py-2 px-4 sm:py-3">Price</th>
              <th className="py-2 px-4 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr
                key={order._id}
                className="border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                onClick={() => handlerowclick(order._id)} // ✅ function reference
              >
                <td className="py-2 px-4">
                  <img
                    src={order.orderItems[0].image}
                    alt={order.orderItems[0].name}
                    className="h-12 w-12 object-cover"
                  />
                </td>
                <td className="py-2 px-4">{order._id}</td>
                <td className="py-2 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-4">
                  {order.shippingAddress.city}, {order.shippingAddress.country}
                </td>
                <td className="py-2 px-4">{order.orderItems.length}</td>
                <td className="py-2 px-4">{order.totalPrice}</td>
                <td className="py-2 px-4">
                  {order.isPaid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Not Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrderPage;
