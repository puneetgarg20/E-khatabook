import React, { useState } from 'react'
import { useContext } from 'react';
import { Statecontext } from '../context/state-context';
import '../App.css'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export const Login = () => {
    const{usernamereg,usernamelogin,passwordreg,useremailreg,useremaillogin,passwordlogin,loginstatus,loginuser,adduser,bllist,lllist,caltotalbl,caltotalll,
        setusernamereg,setusernamelogin,setuseremaillogin,setuseremailreg,setpasswordreg,setpasswordlogin,setloginstatus,setloginuser,setadduser,setbllist,setlllist}=useContext(Statecontext);
      
       const [logstatus,setlogstatus]=useState('');
       const navigate= useNavigate();
        const handleclicklogin=(e)=>{
          e.preventDefault();
          Axios.post("http://localhost:5000/login",{useremail:useremaillogin,password:passwordlogin},{
            withCredentials:true,
        })
          .then((response)=>{
            
            if(!response.data.auth)
            {
              
              setlogstatus("Login Details Not Matched! Please TRY AGAIN.");
            }else{
              console.log(response.data);
              localStorage.setItem('token1',response.data.token);
              setloginuser(response.data.result);
              setloginstatus(true);
              return navigate("/logged");
            }
            
          }).catch((e)=>{
            console.log(e);
          })
          
          
          }

  return (
    <div className='App'>
    <div className='container-login' >


<div className='login'>
<h2>LOGIN</h2>
<form>
  <label>Email_Id</label><br/>
  <input name='useremail'onChange={(e)=>{
    setuseremaillogin(e.target.value);}} ></input><br/>
 <label>Password</label><br/>
  <input name='password' onChange={(e)=>{
    setpasswordlogin(e.target.value)}}></input><br/>
  <button  onClick={handleclicklogin}>LOG-IN</button><br/>
</form>
</div>
<div className='loginbelow'>{logstatus}</div>
<p  > Not Registered ?  <Link to='/register'> Signup</Link></p>
</div>
 </div>
  )
}
