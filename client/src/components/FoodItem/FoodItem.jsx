import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,price,image,description}) => {
  const{cartitems,addToCart,removeFromCart,url}=useContext(StoreContext)

  return (
    <div className='food-item'>
      <div className='food-item-img-contain'>
        <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />

        {!cartitems ? (
          <img 
            className='add' 
            src={assets.add_icon_white} 
            alt="add" 
            onClick={()=>addToCart(id)} 
          />
        ) : (
          <div className='food-item-counter'>
            <img 
              src={assets.remove_icon_red} 
              alt="remove" 
              onClick={()=>removeFromCart(id)} 
            />
            <span>{cartitems[id]}</span>
            <img 
              src={assets.add_icon_green} 
              alt="add" 
              onClick={() => addToCart(id)} 
            />
          </div>
        )}
      </div>

      <div className='food-item-info'>
        <h3 className='food-item-name'>{name}</h3>
        <p className='food-item-description'>{description}</p>
        <p className='food-item-price'>
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR"
          }).format(price)}
        </p>
      </div>
    </div>
  )
}

export default FoodItem
