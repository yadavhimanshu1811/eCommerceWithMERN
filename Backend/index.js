
const express = require('express');
const cors = require("cors");

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();

app.use(express.json());
app.use(cors());

//making API route
app.post("/register", async (req, resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    resp.send(result)
})

//login API
app.post("/login", async (req, resp)=>{
    if (!req.body.email || !req.body.password) {
    // return resp.status(400).send({ error: "Email and password required" });
    return resp.send({ error: "Email and password required" });
  }
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            resp.send(user);
        }else {
            resp.send({error: "No User found. Either Email or password is wrong"});
        }
    }
})

//Add product API
app.post("/addproduct", async(req, resp)=>{
    let product = new Product(req.body);
    let result = product.save();
    resp.send(result);
})

//Get product API
app.get("/getproducts", async(req, resp)=>{
    let product = await Product.find();
    resp.send(product);
    // if(product.length == 0){}    // handle this here or at UI
})

//Delete product API
app.delete("/deleteproduct/:id", async(req, resp)=>{
    let result = await Product.deleteOne({_id: req.params.id});
    resp.send(result);
});


// app.listen(3000);


// Only mongoDB
// const mongoose = require("mongoose");
// const connectDB = async()=>{
//     mongoose.connect("mongodb://localhost:27017/local");
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model('product', productSchema);
//     const data = await product.find();
//     console.warn(data);
// }
// connectDB();


//only express
app.get("/", (req, resp)=>{
    resp.send("Hi Himanshu, your app is running")
});
app.listen(3000)





// using express and mongoDB : 
// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// // Middleware
// app.use(express.json());

// MongoDB connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017");
//     console.log("✅ MongoDB Connected");

//     // Define schema & model
//     const productSchema = new mongoose.Schema({
//       name: String,
//       price: Number,
//     });
//     const Product = mongoose.model("Product", productSchema);

//     // Example route
//     app.get("/", async (req, res) => {
//       const data = await Product.find();
//       res.json(data);
//     });

//     // Start server
//     app.listen(3000, () => console.log("🚀 Server running on port 3000"));
//   } catch (error) {
//     console.error("❌ Connection failed:", error);
//   }
// };

// connectDB();