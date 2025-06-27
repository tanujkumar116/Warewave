import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/adminOrderSlice';
import { useNavigate } from 'react-router-dom';

const OrderManagement = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {user}=useSelector((state)=>state.auth);
  const {orders,loading,error}=useSelector((state)=>state.adminOrder);
  useEffect(()=>{
    if(user && user.role!=="admin"){
      navigate('/')
    }
    else{
      dispatch(fetchAllOrders());
    }
  },[dispatch,user,navigate])
  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrderStatus({id,status:newStatus}))
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-700 bg-white">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total Price</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-300 hover:bg-gray-100">
                  <td className="py-4 px-4 font-medium whitespace-nowrap">#{order._id}</td>
                  <td className="py-4 px-4 font-mediumwhitespace-nowrap">{order.user.name}</td>
                  <td className="py-4 px-4 font-medium  whitespace-nowrap">₹{order.totalPrice}</td>
                  <td className="py-4 px-4 font-medium  whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="text-sm rounded-lg border border-gray-300 px-2 py-1.5"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 px-4">
                    {    (
                      <button
                        onClick={() => handleStatusChange(order._id, "Delivered")}
                        className="bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
