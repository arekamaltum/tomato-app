import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from "react-toastify";

import { data } from 'react-router-dom'
const list = ({url}) => {
  const [list,setList]=useState([])

  const fetchList=async()=>{
    const response=await axios.get(`${url}/api/food/list`)
    if(response.data.success){
      setList(response.data.data)
    }else{
      console.log("error");
    }
  }
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("🗑️ Food removed successfully!");
        await fetchList(); // refresh after deletion
      } else {
        toast.error("❌ Failed to remove food. Try again!");
      }
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Something went wrong while removing!");
    }
  };

  useEffect(()=>{
    fetchList();
  },[])
  return (
    <div className='list add flex-col'>
      <p>All food List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
            <b>Image</b>
            <b>Name</b>
            <b>category</b>
            <b>price</b>
            <b>action</b>
        </div>
        {list.map((item, index) => {
    return (
        <div className='list-table-format' key={index}>
          <img src={`${url}/images/${item.image}`} alt={item.name} />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>Rs {item.price}</p>
          <p onClick={()=>removeFood(item._id)} >X</p>
        </div>
       )
    })}
      </div>      
    </div>
  )
}

export default list
