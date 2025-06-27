import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollectionSection from '../components/Products/GenderCollectionSection'
import NewArrival from '../components/Products/NewArrival'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeatureCollection from '../components/Products/FeatureCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import {useDispatch, useSelector} from 'react-redux'
import { fetchProductDetails, fetchProductsByFilters } from '../redux/slices/productSlice'
import axios from 'axios'
const Home = () => {
  const dispatch=useDispatch();
  const {products,loading,error}=useSelector((state)=>state.products);
  const [bestSellerProduct,setbestSellerProduct]=useState(null);
  useEffect(()=>{
    dispatch(fetchProductsByFilters({
        gender:"Women",
        category:"Bottom Wear",
        limit:8,
    }))
     const fetchBestSeller = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
      setbestSellerProduct(response.data);
      console.log("Fetched Best Seller:", response.data);
    } catch (error) {
      console.log("Error fetching best seller:", error);
    }
  };

  fetchBestSeller();
}, [dispatch]);

useEffect(() => {
  if (bestSellerProduct) {
    console.log("Updated Best Seller State:", bestSellerProduct);
  }
}, [bestSellerProduct]);
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrival/>
        {/* Best seller */}
        <h2 className='text-3xl text-center font-bold'> Best Seller </h2>
        {bestSellerProduct?(<ProductDetails productId={bestSellerProduct._id}/>):
        (<p className='text-center'>Loading best selling product...</p>)}
        <div className='container mx-auto'>
            <h2 className='text-3xl text-center font-bold mb-4'>Top Wear for Women</h2>
            <ProductGrid products={products} loading={loading} error={error}/>
        </div>
        <FeatureCollection/>
        <FeaturesSection/>

    </div>
  )
}

export default Home