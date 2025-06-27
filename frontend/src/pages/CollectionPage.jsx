import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from 'react-icons/fa'
import FilterSidebar from '../components/Layout/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productSlice';
const CollectionPage = () => {
  const {collection}=useParams();
  const [searchParams]=useSearchParams();
  const dispatch=useDispatch();
  const {products,loading,error}=useSelector((state)=>state.products);
  const queryParams=Object.fromEntries([...searchParams]);
  const sidebarRef=useRef(null);
  const [issideOpen ,setIsSidebarOpen]=useState(false);
  useEffect(()=>{
    dispatch(fetchProductsByFilters({collection,...queryParams}))
  },[dispatch,collection,searchParams])
  const toggleSidebar =()=>{
    setIsSidebarOpen(!issideOpen);
  }
  const handleClickOutside =(e)=>{
    if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
        setIsSidebarOpen(false);
    }
  }
  useEffect(()=>{
    document.addEventListener("mousedown",handleClickOutside);
    return ()=>{
        document.removeEventListener("mousedown",handleClickOutside);
    }
    
  },[])
  return (
    <div className='flex flex-col lg:flex-row '>
        {/*Mobile Filter */}
        <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
            <FaFilter className="mr-2"/> Filters
        </button>
        {/*Filter sideBar*/}
        <div ref={sidebarRef} className={`${issideOpen?"translate-x-0":"-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto trasition-trasform duration-300 lg:static lg:translate-x-0  `}>
            <FilterSidebar/>
        </div>
        <div className='flex-grow p-4'>
            <h2 className='text-2xl uppercase mb-4'>All Collections</h2>
             {/* Sort Options */}
             <SortOptions/>
             {/* Product Grid */}
             <ProductGrid products={products} loading={loading} error={error}/>
        </div>
    </div>
  )
}

export default CollectionPage