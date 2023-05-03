var admin=require("firebase-admin");
var fcm = require("fcm-notification");

var serviceAccount = require("../config/push-notification-key.json");
const certPath = admin.credential.cert(serviceAccount);
// var FCM = new fcm(certPath);
const express= require('express');


const app = express();

var bodyParser = require('body-parser');
var cors = require('cors');

var fire =admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var name=""
// app.post('/data', (req, res) => {
//     const db = admin.firestore();
     
//     let data= req.body;
//     console.log("inside the log");
//     console.log(JSON.stringify(data));
    // name= data.name;
    // print(name);
//     //   db.collection('students').get()
//     //   .then(snapshot => {
//     //     snapshot.forEach(doc => {
//     //       console.log(doc.id, '=>', doc.data());
//     //       // console.log(doc.data().name + doc.data().age);
//     //       // console.log(doc.data());
//     //       wholeData.push(doc.data())
//     //     });
//     //     console.log(wholeData)
//     //     res.send(wholeData)
//     //   })
//     //   .catch(error => {
//     //     console.log('Error!', error);
//     // })
//     // res.send({ 
//     //    name: req.body.usn
//     // })
//   })




// exports.postData =(req,res)=>{
//     const db = admin.firestore();
     
//     let data= req.body;
//     console.log("inside the log");
//     console.log(req);
//     console.log(data);
//     console.log(JSON.stringify(data));
//     name= data.name;
//     print(name);
// }







exports.sendPushNotification = (req, res, next) => {
    try{

       


        let message = {
            notification:{
                title: "Test Notification",
                body: "Notification body"
            },
            data: {
                orderId:"1234"
            },
            token:"c7ihYyeARF6gODdkfZD4iI:APA91bGqrUDw_IiLvHZggMwCLPAVocm6pxwSfbUVDyTscwELf8zL8IkrK0f9SV7e3NT_hfNeVp1GzyCUWZeVf5opohAk5jgecaIu2XG9MJU6c0c1uk4HeTs4GXs_oq5N95LD5Rg61p3y"

        };
        FCM.send(message,function(err,resp){
            if(err){
                return res.status(500).send({
                    message:err
                })
            }
            else{
                return res.status(200).send({
                    message:"Notification sent"
                })
            }
        });
    }
    catch(err){
        throw err;
    }
}