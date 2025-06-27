import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOptions = () => {
  const [searchParams,setsearchParams]=useSearchParams();

  const handlesortChange=(e)=>{
       const sortBy=e.target.value;
       searchParams.set("sortBy",sortBy)
       setsearchParams(searchParams);
  }
  return (
    <div className='mb-4 flex items-center justify-end'>
      <select id='sort' className='border border-gray-400 p-1 rounded-md focus:outline-none' onChange={handlesortChange}
      value={searchParams.get('sortBy') || ""}
      >
         <option value='' >Defalut</option>
         <option value='priceAsc' >Price:Low to High</option>
         <option value='PriceDesc' >Price:High to Low</option>
         <option value='popularity' >Popularity</option>
      </select>
    </div>
  )
}

export default SortOptions