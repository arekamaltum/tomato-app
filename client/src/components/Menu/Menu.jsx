import React, {useState} from 'react'
import './Menu.css'
import { menu_list } from '../../assets/assets/frontend_assets/assets'
const Menu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>explore our Menu</h1>
        <p className='explore-menu-text'></p>
        <div className='menu-list'>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='menu-list-items'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}

export default Menu
