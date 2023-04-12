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




app.post("/post",function(req,res){
    let payload=req.body
    console.log(payload)
    let token=req.header("authorization") || "dummyvalue"
if(payload.req=='GET'){
    axios.get(payload.url,{headers:{authorization:token}})
    .then(response=>{
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
}

else if(payload.req=="POST")
{
    axios.post(payload.url,payload.body,{headers:{authorization:token}})
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
}

else if(payload.req=="PUT")
{
    axios.put(payload.url,payload.body,{headers:{authorization:token}})
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
}
else{
    axios.delete(payload.url,{headers:{authorization:token}})
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
}


})
