import React, {useState} from 'react';

import {NavLink} from 'react-router-dom';
import './Navbar.css'

export const Navbar = () => {
   const[menuOpen,setMenuOpen]  = useState(false)
  return (
    <nav class="nav">
        
        <div className='material-symbols-outlined'>KrYpto</div>
        <div className="menu" onClick={()=>{
        setMenuOpen(!menuOpen);
        }}
        >
         
          
        </div>
        <ul className={menuOpen ? "open":""}>
          
        <li><NavLink to="/Home">Home</NavLink></li>   
        <li><NavLink to="/Dashboard">Dashboard</NavLink></li>   
        <li><NavLink to="/Crypto">Crypto</NavLink></li>      
        <li><NavLink to="/News">News</NavLink></li>       
        <li><NavLink to="/transactions">Transactions</NavLink></li>      
        <li><NavLink to="/Login">SignOut</NavLink></li>          

        </ul>



    </nav>
  );
};

export default Navbar