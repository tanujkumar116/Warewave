import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdminProducts } from '../redux/slices/adminProductSlice';
import { fetchAllOrders } from '../redux/slices/adminOrderSlice';

const AdminHomePage = () => {
   const dispatch=useDispatch();
   const {orders,totalOrders,totalSales,loading:ordersLoading,error:ordersError}=useSelector((state)=>state.adminOrder);
   const {products}=useSelector((state)=>state.adminProduct)
   useEffect(()=>{
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders())
   },[dispatch])
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Revenue Card */}
        <div className="p-4 shadow-lg rounded-lg bg-white text-center">
          <h2 className="text-xl font-semibold">Revenue</h2>
          <p className="text-2xl">{totalSales}</p>
        </div>

        {/* Orders Card */}
        <div className="p-4 shadow-lg rounded-lg bg-white text-center">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">{totalOrders}</p>
          <Link to="/admin/orders" className="text-blue-500 hover:underline">
            Manage Orders
          </Link>
        </div>

        {/* Products Card */}
        <div className="p-4 shadow-lg rounded-lg bg-white text-center">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">{products.length}</p>
          <Link to="/admin/products" className="text-blue-500 hover:underline">
            Manage Products
          </Link>
        </div>
      </div>
      <div className='mt-6'>
          <h2 className='text-xl font-bold mb-4'>Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-500">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Total Price</th>
                    <th className="py-3 px-4">Status</th>
                </tr>
                </thead>
                <tbody>
                    {
                        orders.length>0?(
                            orders.map((order)=>(
                                <tr key={order._id} className='border-b border-gray-300 hover:bg-gray-50 cursor-pointer'>
                                <td className='p-4'>{order._id}</td>
                                <td className='p-4'>{order.user.name}</td>
                                <td className='p-4'>{order.totalPrice}</td>
                                <td className='p-4'>{order.status}</td>
                                
                           </tr>
                            ))
                            
                        ):(
                           <tr>
                              <td colSpan={4} className='p-4 text-center text-gray-500'>No recent Orders</td>
                           </tr>
                        )
                    }
                </tbody>
             </table>
            </div>

      </div>
    </div>
  );
};

export default AdminHomePage;
