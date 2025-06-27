import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductSlice';

const ProductManagement = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {products,loading,error}=useSelector((state)=>state.adminProduct);
  useEffect(()=>{
    dispatch(fetchAdminProducts());
  },[dispatch])
  console.log(products);
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you really sure you want to delete the product?')) {
       dispatch(deleteProduct(id))
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className='flex flex-cols justify-between'>
          <h2 className="text-2xl font-bold mb-6">Product Management</h2>
          <div>
              <button onClick={()=>navigate('add')} className='bg-green-600 px-2 py-1 rounded text-white hover:bg-green-700'>Add Product</button>
          </div>
          
      </div>   
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-gray-200 bg-white hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">₹{product.price}</td>
                  <td className="py-3 px-4">{product.sku}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-4 px-4 text-center text-gray-500" colSpan={4}>
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
