
import React,{useState,useEffect, useContext} from 'react';



import { Statecontext } from './context/state-context';

import{Loggedin} from './components/Loggedin'
import { Register } from './components/Register';
import { Axios } from 'axios';
export const App = () => {
  

  const{usernamereg,usernamelogin,passwordreg,passwordlogin,loginstatus,loginuser,adduser,bllist,lllist,caltotalbl,caltotalll,
    setusernamereg,setusernamelogin,setpasswordreg,setpasswordlogin,setloginstatus,setloginuser,setadduser,setbllist,setlllist}=useContext(Statecontext);
   
    //  useEffect(()=>{
       
    //     Axios.get("http://localhost:5000/isauth").then((response)=>{

    //         if(response.data.message=='yes')
    //         {
    //           setloginstatus(true);
    //           setloginuser(response.data.id);
    //         }
    //     }).catch((e)=>{
    //       console.log(e);
    //     })
    //  },[]);
    // if(loginstatus)
    // {
    //  return <Loggedin />
    // }
    // else{
    //     return <Register />
    // }
  
}


