import React, { useContext, useState } from 'react'
import { Statecontext } from '../context/state-context';
import Axios from 'axios'
export  const Blist = (props) => {
    const {_id,name,Date,status,Amount,user}=props.data;
    const [update,setupdate]=useState(0);
    const {bllist,lllist,setbllist,setlllist,caltotalbl,caltotalll,loginuser} =useContext(Statecontext);
   const handleupdate=(e)=>{
      e.preventDefault();
        console.log(_id);
        Axios.patch(`http://localhost:5000/update`,{id:_id,user:user,newtar:update}).then((response)=>{
           console.log(response.data);

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
   }).catch((e)=>{
          console.log(e);
        })
    }

    const handldelete=(e)=> {
    e.preventDefault();
    console.log(_id);
    Axios.delete(`http://localhost:5000/delete/${_id}`).then((response) => {
      console.log("deleted");
      console.log(response.data);
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
    }).catch((e) => {
      console.log(e);
      console.log("request cancel");
    });
  }
  return (
    <>
      
       <tr>
       <td> {name}</td>
       <td> {Date}</td>
       <td> {status}</td>
       <td> {Amount}</td>
       <td><button onClick={handleupdate}>Update</button></td>
       <td><input type='number' onChange={(e)=>{setupdate(e.target.value)}}></input></td>
       <td><button onClick={handldelete}>Delete</button></td>
       </tr>
       
    </>

  )
}
