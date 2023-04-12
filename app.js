let express=require("express")
let app=express()
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"

    )
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    next();
});
//const port=2410;
var port=process.env.PORT || 2410;
app.listen(port,()=>console.log(`Listening on port ${port}`))

let axios=require("axios");

let json

app.post("/set",function(req,res){
    let body=req.body;
    json=body
    //console.log(body)
    //res.send(body)
})


app.get("/getData" ,function(req,res){
 
   let token=req.header("authorization") || "dummyvalue"

    axios.get(json.url,{headers:{authorization:token}})
    .then(response=>{
       console.log(response.data)
      console.log( typeof response.data==='number')
      if(typeof response.data ==='number' ){
        res.send(""+response.data)
      }
      else{
        res.send(response.data)
      }


    })
  
    .catch(error=>{
        if(error.response){
            let {status,statusText}=error.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    })
})
app.post("/postData" ,function(req,res){
    let token=req.header("authorization") || "dummyvalue"
    let body=req.body;
    console.log(body)
    axios.post(json.url,body,{headers:{authorization:token}})
    .then(function(response){
        console.log(response.data)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    
    })
})




app.put("/putData",function(req,res){
    let token=req.header("authorization") || "dummyvalue"
 
    let body=req.body;
    axios.put(json.url,body,{headers:{authorization:token}})
    .then(function(response){
        console.log(response.data)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    
    })
})


app.delete("/deleteData",function(req,res){
    let token=req.header("authorization") || "dummyvalue"
    
    axios.delete(json.url,{headers:{authorization:token}})
    .then(function(response){
        console.log(response.data)
        res.send("deleted")
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    
    })
})
