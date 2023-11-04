//dotenv
const dotenv =require('dotenv') 
dotenv.config();

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const setrounds=10;
const cookieParser = require('cookie-parser');
mongoose.connect(process.env.DATABASE_URL).then(() => { console.log("successsfully connected") }).catch((e) => {
    console.log("Not connected");
   
})


const recordschema = new mongoose.Schema({
    name: String,
    Date: String,
    status: String,
    Amount: Number,
    user: String
})

const reguserschema = new mongoose.Schema({
    username:String,
    useremail:String,
    password:String
})

const reguser = mongoose.model("reguser", reguserschema);
const Record = mongoose.model("Record", recordschema);

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const jwt=require('jsonwebtoken');

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your client's domain
    
    credentials: true,
  }));

app.post("/register", (req, res) => {
    const username = req.body.username;
    const useremail=req.body.useremail;
    const password = req.body.password;
    console.log(req.body);
  reguser.find({useremail:useremail}).then((result)=>{
    console.log(result);
    if(result.length>0)
    {
        res.send({exist:true});
    }
    else{
        bcrypt.hash(password,setrounds,(err,hash)=>{
            if(err)
            console.log(err);
            const newuser = new reguser({ 
                username: username,
                useremail:useremail,
                password: hash,
            });
            newuser.save();
            res.send({exist:false});
           })
    }
  }).catch((e)=>{
    console.log(e);
  })
   
   
    
})


 const autherization=(req,res,next)=>{
    
    const token=req.body.token;
    
    if(!token){
       res.send({id:'',message:"Not found token"});
        
       
    }
    else{
        jwt.verify(token,process.env.JWT_SECRETKEY,(err,decoded)=>{
            req.id=decoded.id;
            if(err)
            {
               res.send({id:'',message:"Not matched credentials!"});
                
               
            }else{
                
                next();
            }
        })
    }
 }
app.post("/isauth",autherization,(req,res)=>{
   res.send({id:req.id , message:"yes"});
});
app.post("/login", (req, res) => {
    const useremail = req.body.useremail;
    const password = req.body.password;

    reguser.find({ useremail: useremail }).then((result) => {

        if (result.length < 1) {
            res.json({auth:false,message:"No user existed!"});
        }
        else
            {
                bcrypt.compare(password,result[0].password,(err,response)=>{
                    if(response)
                    {
                        console.log(result);
                           const id=result[0].useremail;
                         
                           const token=jwt.sign({id},process.env.JWT_SECRETKEY,{
                            expiresIn:"1d",
                           });
                        
                        
                        res.json({auth:true, token:token,result:result[0].useremail});
                       
                    }
                    else
                    res.json({auth:false,message:"Log in details not matched "});

                })
            }
    }).catch((e) => {
        res.send("not found");
    })
})

app.post("/add",(req, res) => {
    console.log(req.body);
    const newrecord = new Record({
        name: req.body.addname,
        Date: req.body.adddate,
        status: req.body.addstatus,
        Amount: req.body.addamount,
        user: req.body.user,
    });
    console.log(newrecord);
    newrecord.save();
    res.send("New Record saved successfully");
})

app.post("/getborrow/:topic",autherization,(req, res) => {
    Record.find({ status: 'borrow', user: req.params.topic }).then((data) => {
        res.send({message:"yes",data});
    }).catch((e) => {
        console.log(e);
    })

})
app.post("/getlend/:topic",autherization,(req, res) => {
    Record.find({ status: 'lend', user: req.params.topic }).then((data) => {
        res.send({message:"yes",data});
    }).catch((e) => {
        console.log(e);
    })
});

app.patch("/update/",(req,res)=>{
    console.log("username to be updated:"+req.body.id+"amount to be:"+req.body.newtar);
    Record.updateOne({_id:req.body.id,user:req.body.user},{$set:{Amount:req.body.newtar}}).then(()=>{
        res.send("updated successfully");
    }).catch((e)=>{
        console.log((e));
    })
});

app.delete("/delete/:id",(req,res)=>{
    console.log(req.params.id);
    Record.deleteOne({_id:req.params.id}).then(()=>{
        console.log("deleted")
        res.send("successfully delete record!");
    }).catch((e)=>{res.send(e)});
})


app.listen(process.env.PORT, (req, res) => {
    console.log("server running on  PORT number"+process.env.PORT);
})