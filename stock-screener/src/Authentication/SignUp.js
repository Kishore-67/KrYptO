/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import './Signup.css'
import { CiMail } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import ima from '../Resources/Revenue-bro.png'

import { RiLockPasswordFill } from "react-icons/ri";
import {useNavigate} from 'react-router-dom'
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !email  || !password )
    {
      alert('Please enter the below all fields');
      return;
    }
    
    else{
      try {
        await axios.post('http://localhost:5000/signup', {username,email,password});
        alert('User signed up successfully');
       navigate('/Home');
      } catch (error) {
        console.error('Error signing up:', error);
        alert('Failed to sign up');
      }
    }
  };

  return (
    // <div className="form-container sign-up-container">
    //   <form onSubmit={handleSubmit}>
       
    //     <h1>Create Account</h1>

       
    //     <div className="social-container">
    //       <a href="#" className="social">
    //         <i className="fab fa-facebook-f" />
    //       </a>
    //       <a href="#" className="social">
    //         <i className="fab fa-google-plus-g" />
    //       </a>
    //       <a href="#" className="social">
    //         <i className="fab fa-linkedin-in" />
    //       </a>
    //     </div>
    //     <span>or use your email for registration</span>
    //      <input
    //       type="text"
    //       name="name"
    //       value={formData.name}
    //       onChange={handleChange}
    //       placeholder="Name"
    //     /> 
    //     <input
    //       type="email"
    //       name="email"
    //       value={formData.email}
    //       onChange={handleChange}
    //       placeholder="Email"
    //     />
    //     <input
    //       type="password"
    //       name="password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       placeholder="Password"
    //     />
    //     <div className='boo'>
    //     <button type="submit">Sign Up</button>

    //     </div>
        

    //   </form>
    // </div>

    <div className='parent2'>
      <img src={ima} className='ima' alt='crypto'height={550} width={550} />

    <div className='Signup'>
    <form onSubmit={handleSubmit}>
            <h1>Register</h1>

            <div className="input-box">
            <input type="text"  placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <FaRegUser className='icon' />
        </div>

        <div className="input-box">
            <input type="text"  placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <CiMail className='icon' />
        </div>

        <div className="input-box">
        <input type="text"  placeholder=" Create Password" value={password} onChange={e=>setPassword(e.target.value)}  required/>
        <RiLockPasswordFill className='icon' />
        </div>
       -<div className='but-container'>
        <button type="submit" >Sign Up</button>
        </div>
        <div className="register-link">
            <p>Already have an account? <div><Link to={'/Login'} >Login</Link></div></p>
        </div>

        </form>
        </div>
        </div>
  );
};

export default SignUp;
