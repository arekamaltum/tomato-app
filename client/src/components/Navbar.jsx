import React, { useState } from 'react'
import {assets} from '../assets/assets/frontend_assets/assets'
import './Navbar.css'
import { Link,useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
const Navbar = ({setShowLogin}) => {
    const [menu,setMenu]=useState("home")
    const {token,setToken}=useContext(StoreContext)
    const navigate=useNavigate()
    const logout=()=>{
        localStorage.removeItem("token")
        setToken("")
        navigate("/")

    }
  return (
    <div className='navbar'>
        <Link to={'/'}><img src={assets.logo} alt='logo'/></Link>  
        <ul className='navbar-menu'>
            <Link to={'/'} onClick={()=>setMenu("home")} className={menu === "home" ? "active" : ""} >
                home
            </Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==='menu'?"active":""}>
                menu
            </a>
            <a href='#footer' onClick={()=>setMenu("About-us")}className={menu==="about-us"?"active":""}>
                About us
            </a>
            <a href='#footer' onClick={()=>setMenu("contact-us")}className={menu==="contact-us"?"active":""}>
                contact-us
            </a>
        </ul>
   
    <div className='navbar-right'>
        <img src={assets.search_icon} alt='basket-icon' onClick={()=>handleSearch}/>
        <div className='navbar-search-icon'>
            <Link to={'/cart'}><img src={assets.basket_icon} alt=''/></Link>
            <div className='dot'></div>
        </div>
        {!token? <button onClick={()=>setShowLogin(true)}>sign in</button>:
        <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='profile'/>
           
            <ul>
                <li><img src={assets.bag_icon} alt='' /><p>orders</p></li>
                <hr/>
                <li onClick={logout}><img src={assets.logout_icon} alt=''/><p>logout</p></li>
            </ul>
            
        </div>
        }
       
    </div>
    </div>
  )
}

export default Navbar
