const express = require("express");
const app = express();
var admin = require("firebase-admin");
var serviceAccount = require("./config/push-notification-key.json");
var bodyParser = require("body-parser");
var cors = require("cors");

app.use("/api", require("./route/app.route"));
app.use("/data", require("./route/app.route"));
var fcm = require("fcm-notification");
const certPath = admin.credential.cert(serviceAccount);

var FCM = new fcm(certPath);

// var fire =admin.initializeApp({
//     credential:admin.credential.cert(serviceAccount)
// });
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var namee = "";
var mentor = "";

app.get("/data", (req, res) => {
  const db = admin.firestore();
  console.log(req.body);
  var wholeData = [];
  db.collection("students")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        // console.log(doc.data().name + doc.data().age);
        // console.log(doc.data());
        wholeData.push(doc.data());
      });
      console.log(wholeData);
      res.send(wholeData);
    })
    .catch((error) => {
      console.log("Error!", error);
    });
});

app.post("/data", (req, res) => {
  const db = admin.firestore();

  let data = req.body;
  console.log("printing the data");
  console.log("inside the log");
  console.log(JSON.stringify(data));

  for (const key in data) {
    console.log("printin the kwy:::::::::::");
    console.log(key);
    db.collection("students")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          //   console.log(doc.id, '=>', doc.data());
          if (doc.id == key) {
            console.log("Mentor is", doc.data().mentor);
            mentor = doc.data().mentor;
            namee = doc.data().name;
          }
          //   // console.log(doc.data().name + doc.data().age);
          // console.log(doc.data());
        });
        // console.log(wholeData)
        // res.send(wholeData)
      })
      .catch((error) => {
        console.log("Error!", error);
      });

    db.collection("mentors")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log("Inside mentors:::::::::::::::::::");
          // console.log(doc.id, '=>', doc.data());
          if (doc.data().name == mentor) {
            console.log("Token is", doc.data().key);
            token = doc.data().key;
            console.log("logging the name::::::::::");
            console.log(namee);
            sendNotification(token, namee);
            addTODB(namee);
          }
          //   // console.log(doc.data().name + doc.data().age);
          // console.log(doc.data());
        });
        // console.log(wholeData)
        // res.send(wholeData)
      })
      .catch((error) => {
        console.log("Error!", error);
      });
  }
});

function addTODB(name) {
  console.log("inside AddTODB");
  const db = admin.firestore();

  const d = new Date();
  const da = d.toUTCString();

  db.collection("captured").add({
    name: name,
    date: da,
  });
}

function sendNotification(token, name, date) {
  try {
    console.log("inside log");

    console.log(token, name);

    let message = {
      notification: {
        title: "Bunk alert!!!!!!!!!!!",
        body: name + " is not attending Class now",
      },
      data: {
        orderId: "1234",
      },
      token: token,
    };
    FCM.send(message, function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent:::::::::::::::::::::::::::::::::::::");
        // console.log(date);
      }
    });
  } catch (err) {
    throw err;
  }
}

app.listen(4000, function () {
  console.log("It's ready");
});
module.exports = app;
