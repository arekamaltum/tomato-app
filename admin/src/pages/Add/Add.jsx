import React, { useState ,useEffect} from 'react'
import './Add.css'
import axios from 'axios'
import { assets } from '../../assets/admin_assets/assets'
const Add = ({url}) => {
  
  const [image,setImage]=useState(false)
  const [data,setData]=useState({
    name:"",
    price:"",
    category:"salad",
    description:""
  })
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData({...data,[name]:value})
  }
  /*  useEffect(()=>{
    console.log(data);
  },[data]) */
const onSubmitHandler=async (event)=>{
event.preventDefault();
const formData=new FormData();
formData.append("image",image)
formData.append("name",data.name)
formData.append("price",Number(data.price))
formData.append("category",data.category)
formData.append("description",data.description)

const response= await axios.post(`${url}/api/food/add`,formData)
if(response.data.success){
  alert("Product Added Successfully")
  event.target.reset(); 
  setData({
    name:"",
    price:"",
    category:"salad",
    description:""
  })
  setImage(false)
}
else{

}
}

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-image-upload flex-col'>
          <p>upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' hidden required id='image' />
        </div>
      
      <div className='add-product-name flex-col' >
        <label htmlFor='product-name'>Product Name</label>
        <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Product Name' />
      </div> 
      <div className='add-product-description flex-col' >
        <p>product description</p>
        <textarea  onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Product Description' required></textarea>
      </div>
      <div className='add-category-price'>
        <div className='add-category flex-col'>
          <p>Category</p>
          <select  onChange={onChangeHandler} value={data.category} name="category" id="category">
            <option value="salad">salad</option>
            <option value="rolls">rolls</option>
            <option value="desert">desert</option>
            <option value="cake">cake</option>
            <option value="juice">juice</option>
            <option value="noodles">noodles</option>
            <option value="pasta">pasta</option>
            <option value="pizza">pizza</option>
          </select>
        </div>
        <div className='add-price flex-col'>
          <p>product price</p>
          <input  onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='Product Price' />
        </div>
      </div>
      <button type='submit'>Add Product</button>
      </form>
    </div>
  )
}

export default Add
