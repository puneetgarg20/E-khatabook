import React, { useState } from 'react'
import { useContext } from 'react';
import { Statecontext } from '../context/state-context';
import '../App.css'
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
export const Register = () => {
    const{usernamereg,passwordreg,useremailreg,
        setusernamereg,setuseremailreg,setpasswordreg,setloginuser,loginuser}=useContext(Statecontext);
    const [regstatus,setregstatus]=useState('');
    const navigate= useNavigate();
    const handleclickreg=(e)=>{
        e.preventDefault();
        Axios.post("http://localhost:5000/register",{username:usernamereg,useremail:useremailreg,password:passwordreg})
        .then((response)=>{
          console.log(response);
          if(!response.data.exist)
          {
             setregstatus('');
             return navigate("/login");
          }
          else
          {
            setregstatus("This Email Id already existed!");
          }
        }).catch((e)=>{
          console.log(e);
        })
      }
  return (
    

    <div className='App'>
       
    <div className='container-login' >
     
    <div className='register'>
<h2>REGISTER</h2>
<form>
  <label>Username</label><br/>
  <input type="text" name='username' onChange={(e)=>{
    setusernamereg(e.target.value);
  }}></input><br/>
  <label>Email_Id</label><br/>
  <input type="email" name='useremail' onChange={(e)=>{
    setuseremailreg(e.target.value);
  }}></input><br/>
  <label>Password</label><br/>
  <input  type="text" name='password' onChange={(e)=>{
    setpasswordreg(e.target.value);
  }}></input><br/>
  <button onClick={handleclickreg}>REGISTER</button><br/>
</form>
</div>
<div className='loginbelow'>{regstatus}</div>
<p>Is Already Register? <Link to="/login">Login</Link></p>
</div>
</div>
  )
}
