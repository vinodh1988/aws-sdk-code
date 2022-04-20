var express=require("express")
var app=  express()
var AWS = require('aws-sdk')

AWS.config.update({region: 'ap-southeast-1'})

var sqs =new AWS.SQS()

app.use(express.json())

app.get("/",function(request,response){
    response.send("Hello World!!!! node app is running... with changes")
})

app.post("/message", function(request,response){
    let message  =  request.body.message
    let queueMessage = {
        MessageBody : message,
        QueueUrl: "https://sqs.ap-southeast-1.amazonaws.com/212725060416/firstQueue"
    }
  sqs.sendMessage(queueMessage,function(err,data){
        if(err){
             console.log(err)
             response.send("Message not delivered")
        }
        else{
            console.log("Success",data)
            response.send("Message sent successfuly")
        }
    }).promise()
  
})

app.listen("3000",function(){
    console.log("server is running on 3000")
})