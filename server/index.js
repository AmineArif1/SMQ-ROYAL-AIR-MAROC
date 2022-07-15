const express=require('express');
var mysql = require('mysql');
var cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
const db = mysql.createConnection({

    host: "localhost",
 
    user: "root",
 
    password: "password",

    database:"ramadmin"
 
  });
 
db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });

// input dyal api
app.post("/api/insert",(req,res)=>{
    
    let password=req.body.password;

    let username=req.body.username;

    


    
    db.query(
      "select * from users where email=? and password=? and statut=1",
      [username,password],
      (err,result)=>{
     
      if(err){
        
        console.log({err:err})
      }
      if(result[0]){
        res.send(result)
        console.log(result)
      }
      else{
        res.send({message:"Wrong username/password"})
        console.log({message:"Wrong username/password"})
      }
      
    
  
})
}) 

app.post("/api/delete",(req,res)=>{
 console.log("I am hereeee")
  let id=req.body.id;
    db.query(
    "delete from users where id=?",
    [id],
    (err,result)=>{
   
    if(err){
      
      console.log({err:err})
    }
    res.send(result)
  
  

}) 
}) 
app.get("/api/get",(req,res)=>{
    console.log("m here")
    const sqlquery="select * from users;";
    // db.query(sqlquery,[username,password,'ah','ah'],(err,result)=>(
    //     res.send(err)

    // ));
   

    db.query(sqlquery,(err,result)=>(
     
      
        
      res.send(result)
    
  
    ))})
  app.post("/api/Yadmin",(req,res)=>{
 
      let id=req.body.id;
        db.query(
        "update users set statut=1 where id=?",
        [id],
        (err,result)=>{
       
        if(err){
          
          console.log({err:err})
        }
        res.send(result)
      
      
    
    }) 
    }) 
    app.post("/api/Nadmin",(req,res)=>{
      
      let id=req.body.id;
      
        db.query(
        "update users set statut=0 where id=?",[id],
       
        (err,result)=>{
          
        if(err){
          
          console.log({err:err})
        }
        res.send(result)
      
    
    }) 
    }) 

app.listen(3002,()=>{
    console.log("running on 3002")
}
)