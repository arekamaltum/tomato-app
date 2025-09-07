import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-contents'>
        {/* Left Section */}
        <div className='footer-contents-left'>
          <img src={assets.logo} alt='Tomato logo'/>
          <p>
            Tomato is your go-to food delivery platform bringing delicious meals 
            from the best restaurants straight to your doorstep. Fast, reliable, 
            and made with love.
          </p>
          <div className='social-links'>
            <img src={assets.facebook_icon} alt='facebook'/>
            <img src={assets.twitter_icon} alt='twitter'/>
            <img src={assets.linkedin_icon} alt='linkedin'/>
          </div>
        </div>

        {/* Center Section */}
        <div className='footer-contents-center'>
          <h2>Tomato</h2>
          <h3>Why Tomato? Because it sounds Better 🍅</h3>
          <ul>
            <li>Home</li>
            <li>Menu</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
            <li>About Us</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className='footer-contents-right'>
          <h2>Get in Touch</h2>
          <ul>
            <li>📞 +91-9026775928</li>
            <li>📧 kamalyaduvanshi0987@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />

      {/* Copyright Section */}
      <p className='footer-copyright'>
        © {new Date().getFullYear()} Tomato. All rights reserved. | Designed with ❤️ by Kamal 
      </p>
    </div>
  )
}

export default Footer
