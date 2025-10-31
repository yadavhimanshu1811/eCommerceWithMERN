const express = require('express');
const app = express();

app.get("/", (req, resp)=>{
    resp.send("Hi Himanshu, your app is running")
});

app.listen(3000)