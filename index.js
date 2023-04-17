const express= require('express');
const app = express();

app.use("/api",require("./route/app.route"));

app.listen(4000,function(){
    console.log("It's ready");
})