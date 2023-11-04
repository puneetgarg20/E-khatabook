import React from 'react'
import { useContext , useEffect,useRef } from 'react';
import { Statecontext } from '../context/state-context';
import '../App.css'
import Axios from 'axios';
import { Blist } from './Blist';
import { useNavigate } from 'react-router-dom';
export const Loggedin = () => {

    const{usernamereg,usernamelogin,passwordreg,passwordlogin,loginstatus,loginuser,adduser,bllist,lllist,caltotalbl,caltotalll,
        setusernamereg,setusernamelogin,setpasswordreg,setpasswordlogin,setloginstatus,setloginuser,setadduser,setbllist,setlllist}=useContext(Statecontext);
        const inputname=useRef(null);   
        const inputdate=useRef(null);   
        const inputstatus=useRef(null);   
        const inputamount=useRef(null);   
        
        const navigate = useNavigate();
        useEffect(()=>{
          Axios.post("http://localhost:5000/isauth",
          {
            token:localStorage.getItem('token1'),
          }
          ).then((response)=>{
                if(response.data.message=="yes")
                {
                  setloginuser(response.data.id);
                  console.log(response.data.id);
                  callabove(response.data.id);
                }
                else
                {
                   return navigate("/login");
                }
          }).catch((err)=>{
            console.log(err);
          })


      
    },[]);

    const callabove=(str)=>{
      Axios.post(`http://localhost:5000/getborrow/${str}`,{
        token:localStorage.getItem('token1'),
      }).then((response)=>{
        console.log(response.data);
        if(response.data.message=="yes")
        setbllist(response.data.data);
       }).catch((e)=>{
        console.log(e);
       })
  
       Axios.post(`http://localhost:5000/getlend/${str}`,{
        token:localStorage.getItem('token1'),
      }).then((response)=>{
        console.log(response.data);
        if(response.data.message=="yes")
        setlllist(response.data.data);
       }).catch((e)=>{
        console.log(e);
       })
      console.log("refreshed");
    }

    const handleadd=(e)=>{ 
        e.preventDefault();
        Axios.post("http://localhost:5000/add",adduser).then((response)=>{
           console.log(response);
            Axios.post(`http://localhost:5000/getborrow/${loginuser}`,{
              token:localStorage.getItem('token1'),
            }).then((response)=>{
              if(response.data.message=="yes")
              setbllist(response.data.data);
            
          }).catch((e)=>{
            console.log(e);
          })
          Axios.post(`http://localhost:5000/getlend/${loginuser}`,{
            token:localStorage.getItem('token1'),
          }).then((response)=>{
           if(response.data.message=="yes")
            setlllist(response.data.data);
           }).catch((e)=>{
            console.log(e);
           })
           inputname.current.value="";
           inputdate.current.value="";
           inputstatus.current.value="";
           inputamount.current.value="";
    
    
        }).catch((e)=>{
          console.log(e);
        })
      }

     

    const handlelogout=()=>{
      localStorage.removeItem("token1");
      setloginuser('');
      return navigate("/login");
    }

    let bl=caltotalbl();
    let ll=caltotalll();

  return (
    

    <div className='logged'>
    
    <div className='header'>
    <h1 className='userh1'>Welcome To e-khata: </h1>
    <button className='logoutbtn' onClick={handlelogout } >LogOut</button>
    </div>
    <div className='container'>
      <h2 className='head'>Manage your Money Here!:</h2>

      {
        (bllist.length==0 && lllist.length==0)? <h1>No Data Added! </h1>:null
      }
      {
        (bllist.length>0)?
        <div className='borrowsection'>
        <h2>To Borrow:</h2>
        <div className='borrowlist'>
        <table cellSpacing="15px">
           <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Amount(₹)</th>
            </tr>
 
            {
              bllist.map((val)=>{
                return (<Blist data={val}/>);
              })
            }
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td> <h3>Total : ₹{bl}</h3></td>
              </tr>
        </table>
        
          </div>
          </div> :
          null
      }
          
      
      {
        (lllist.length>0) ?
        <div className='lendsection'>
          <h2>To Lend:</h2>
          <div className='lendlist'>
          <table cellSpacing="15px">
             <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount(₹)</th>
              </tr>
   
              {
                lllist.map((val)=>{
                  return (<Blist data={val}/>);
                })
              }
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td> <h3>Total : ₹{ll}</h3></td>
              </tr>
          </table>
          
          </div>
      </div> :
      null
      }
     
      <div className='edit-section'>
          <hr/>
          <h3>Enter A New Record:</h3>
            <form>
              <label>Enter Name</label>
              <input type="text" placeholder='Name' ref={inputname} onChange={(e)=>{setadduser({
                ...adduser,
                addname:e.target.value,user:loginuser
              })}}></input>
              <label>Enter Date</label>
              <input  type='date' placeholder='Date' ref={inputdate} onChange={(e)=>{setadduser({
                ...adduser,
                adddate:e.target.value,user:loginuser
              })}}></input>
              <label>Enter Status</label>
              <input type='text' placeholder='borrow/lend' ref={inputstatus} onChange={(e)=>{setadduser({
                ...adduser,
                addstatus:e.target.value,user:loginuser
              })}}></input>
              <label>Enter Amount</label>
              <input type='number' placeholder='Amount' ref={inputamount}  onChange={(e)=>{setadduser({
                ...adduser,
                addamount:e.target.value,user:loginuser
              })}}></input>
              <button onClick={handleadd}>ADD</button>
            </form>
          
      </div>
  </div>
  </div>
  )
}
