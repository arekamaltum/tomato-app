import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <NavLink to={'/add'} className='sidebar-option'>
        <img src={assets.add_icon} alt='' />
        <p>Add Item</p>
      </NavLink>
      <NavLink to={'/list'}className='sidebar-option'>
        <img src={assets.order_icon} alt='' />
        <p>list Item</p>
      </NavLink>
      <NavLink to={'/order'} className='sidebar-option'>
        <img src={assets.order_icon} alt='' />
        <p>orders</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
