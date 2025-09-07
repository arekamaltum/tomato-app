import React, { useContext } from 'react'
import './cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartitems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext)
  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {food_list.map((item, index) => {
          if (cartitems[item._id] > 0) {
            return (
              <div className='cart-items-items' key={index}>
              <img src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartitems[item._id]}</p>
                <p>₹{cartitems[item._id] * item.price}</p>
                <p
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  ✖
                </p>
              </div>
            )
          }
          return null
        })}
      </div>

      {/* Cart total section */}
      <div className='cart-total'>
        <p>Total</p>
        <p>₹{getTotalCartAmount()}</p>
        <button onClick={() => navigate('/placeorder')}>Place Order</button>
      </div>
    </div>
  )
}

export default Cart
