import React from 'react';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice';

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        guestId,
        userId,
        size,
        color,
      }));
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    console.log(productId);
    dispatch(removeFromCart({ productId, size, color,userId,guestId }));
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div key={index} className="flex items-start justify-between py-4 border-b border-gray-300">
          <div className="flex items-start">
            <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
            <div>
              <h3>{product.name}</h3>
              <p className='text-sm text-gray-500'>
                Size: {product.size} | Color: {product.color}
              </p>
              <div className='flex items-center mt-2'>
                <button
                  onClick={() =>
                    handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)
                  }
                  className='border rounded px-2 py-0.5 text-xl font-medium hover:cursor-pointer'
                >
                  -
                </button>
                <span className='mx-4'>{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)
                  }
                  className='border rounded px-2 py-0.5 text-xl font-medium hover:cursor-pointer'
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>{product.price.toLocaleString()} Rs</p>
            <button
              onClick={() =>
                handleRemoveFromCart(product.productId, product.size, product.color)
              }
            >
              <RiDeleteBin3Line className="h-5 w-5 mt-2 text-red-500 hover:cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
