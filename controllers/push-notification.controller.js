var admin=require("firebase-admin");
var fcm = require("fcm-notification");

var serviceAccount = require("../config/push-notification-key.json");
const certPath = admin.credential.cert(serviceAccount);
var FCM = new fcm(certPath);

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