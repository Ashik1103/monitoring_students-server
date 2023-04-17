const pushNotificationController = require("../controllers/push-notification.controller");
const express = require("express");
const router=express.Router();

router.post("/send-notification",pushNotificationController.sendPushNotification);

module.exports=router;