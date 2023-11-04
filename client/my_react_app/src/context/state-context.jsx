import React, { createContext, useState } from 'react'



export const Statecontext =createContext();



export const StateContextProvider = (props) => {
    const [usernamereg,setusernamereg]=useState("");
  const [passwordreg,setpasswordreg]=useState("");
  const [usernamelogin,setusernamelogin]=useState("");
  const [passwordlogin,setpasswordlogin]=useState("");
  const [loginstatus,setloginstatus]= useState(false);
  const [loginuser,setloginuser]=useState("");
  const [useremailreg,setuseremailreg]=useState("");
  const [useremaillogin,setuseremaillogin]=useState("");
  const [adduser,setadduser]=useState(
    {
      addname:'',
      adddate:0,
      addstatus:'',
      addamount:0,
      user:''
     }
   );
   const[bllist,setbllist]=useState([]);
   const[lllist,setlllist]=useState([]);
  
   const caltotalbl=()=>{
    let bl=0;
    
    for(const item in bllist)
    {
      bl=bl+ bllist[item].Amount;
    }
   
    return bl;
   }
   const caltotalll=()=>{
    
    let ll=0;
   
    for(const item in lllist)
    {
      ll=ll+lllist[item].Amount;
    }
    return ll;
   }

    const contextvalue={usernamereg,usernamelogin,passwordreg,useremailreg,useremaillogin,passwordlogin,loginstatus,loginuser,adduser,bllist,lllist,caltotalbl,caltotalll,
        setusernamereg,setusernamelogin,setpasswordreg,setuseremailreg,setuseremaillogin,setpasswordlogin,setloginstatus,setloginuser,setadduser,setbllist,setlllist};
  return (
    <Statecontext.Provider value={contextvalue}>
        {props.children}
    </Statecontext.Provider>
  )
}
