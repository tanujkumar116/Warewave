import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters, setFilters } from '../../redux/slices/productSlice';

const SearchBar = () => {
  const [Searchterm,setSearchterm]=useState("");
  const [isOpen,setisOpen]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const handleSearchToggle=()=>{
    setisOpen(!isOpen);
  }
  const handleSearch =(e)=>{
     e.preventDefault();
     dispatch(setFilters({search:Searchterm}));
     dispatch(fetchProductsByFilters({serch:Searchterm}))
     navigate(`/collections/all?search=${Searchterm}`)
     console.log(Searchterm);
     setisOpen(false);
  }
  return (
    <div className={`flex items-center justify-center w-full trastition-all duration-300 ${isOpen?"absolute top top-0 left-0 w-full bg-white h-24  z-50 ":"w-auto"}  `}>
        {
            isOpen?(
                <form onSubmit={handleSearch} className='relative flex items-center justify-center w-full'>
                    <div className='relative w-1/2'>
                       <input type='text' placeholder='Search' value={Searchterm} onChange={(e)=>setSearchterm(e.target.value)}  className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700'/>
                       <button type='submit ' className='absolute right-2 top-1/2 trasform -translate-y-1/2 text-gray-600 hover:text-gray:700'>
                    <HiMagnifyingGlass className='h-6 w-6 '/>
                </button>
                    </div> 
                    <button onClick={handleSearchToggle} type="button" className='absolute right-4 top-1/2 transform -traslate-y-1/2 text-gray-600 hover:text-gray-700'>
                        <HiMiniXMark className='h6 w-6'/>
                    </button>
                </form>
            ):(<button onClick={handleSearchToggle}>
                <HiMagnifyingGlass className='h-10 w-7 my-10'/>
            </button>)
        }
    </div>
  )
}

export default SearchBar