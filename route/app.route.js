const pushNotificationController = require("../controllers/push-notification.controller");
const express = require("express");
const router=express.Router();

router.post("/send-notification",pushNotificationController.sendPushNotification);
// router.post("/dataa",pushNotificationController.postData)

module.exports=router;