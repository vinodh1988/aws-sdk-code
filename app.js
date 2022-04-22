var express=require("express")
var app=  express()
var AWS = require('aws-sdk')
var fs=require("fs")


const fileUpload = require('express-fileupload');

AWS.config.update({region: 'ap-southeast-1'})

var sqs =new AWS.SQS()

const s3=new AWS.S3(
    {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY
    }
)

app.use(fileUpload())
app.use(express.json())

app.get("/",function(request,response){
    response.send("Hello World!!!! node app is running... with changes")
})

app.post("/upload",function(request,response){
    let file=request.files.myfile
    const content = Buffer.from(file.data,"binary")
    const params= {
        Bucket: 'firstbucket5725',
        Key: file.name,
        Body: content
    }

    s3.upload(params,function(err,data){
        if(err){
        console.log(err)
        response.status(500).send("file not uploaded")
        }
        else
        response.send("File uploaded successfully")
    })



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
    })
  
})

app.listen("3000",function(){
    console.log("server is running on 3000")
})