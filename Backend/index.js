
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");
const jwtKey = "yadavhimanshu-ecom"

require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();

app.use(express.json());
app.use(cors());

//signupAPI
app.post("/register", async (req, resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password //TODO 
    Jwt.sign({result},jwtKey,{expiresIn:"1h"}, (err, token)=>{
        if(err){
            resp.send({error: "Something went wrong"});
        }
        resp.send({user:result, auth:token});
    })
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
            Jwt.sign({user},jwtKey,{expiresIn:"1h"}, (err, token)=>{
                if(err){
                    resp.send({error: "Something went wrong"});
                }
                resp.send({user, auth:token});
            })
            
        }else {
            resp.send({error: "No User found. Either Email or password is wrong"});
        }
    }
})

//Add product API
app.post("/addproduct",verifyToken, async(req, resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

//Get product API
app.get("/getproducts",verifyToken, async(req, resp)=>{
    let product = await Product.find();
    resp.send(product);
})

//Get one product API
app.get("/getproduct/:id",verifyToken, async (req, res) => {
  try {
    const id = req.params.id;

    // check if valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) { //TODO revise
      return res.status(400).send({ error: "Invalid product ID" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ error: "No product found with this ID" });
    }

    res.send(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//Update Product API
app.put("/updateproduct/:id",verifyToken, async(req, resp)=>{
    try{
        const result = await Product.updateOne(
            {_id: req.params.id},
            {$set: req.body}
        )

        if(result.matchedCount == 0){
            return resp.status(404).send({ error: "No product found with this ID" });
        }
        resp.send(result);
    }catch(err){
        console.error("Error updating product:", err);
        resp.status(500).send({ error: "Internal Server Error" });
    }
})

//Delete product API
app.delete("/deleteproduct/:id",verifyToken, async(req, resp)=>{
    let result = await Product.deleteOne({_id: req.params.id});
    resp.send(result);
});

//Search API
app.get("/search/:key",verifyToken, async(req, resp)=>{
    let result = await Product.find({
        "$or":[ //TODO revise
            { name:{$regex:req.params.key}}, //add whatever keys to check
            { company:{$regex:req.params.key, $options: "i"}}, //for lower&upper case insensitivity
        ]
    })
    resp.send(result);
})

//Update user details API
app.put("/updateuser/:id", verifyToken, async(req, resp)=>{
    try{
        const result = await User.updateOne(
            {_id: req.params.id},
            {$set: req.body}
        )

        if(result.matchedCount == 0){
            return resp.status(404).send({ error: "No user found with this ID" });
        }
        resp.send(result);
    }catch(err){
        console.error("Error updating user details:", err);
        resp.status(500).send({ error: "Internal Server Error" });
    }
})

function verifyToken(req, resp, next){ //middleware
    let token = req.headers["authorization"];
    if(token){
        // token.split(' ')     if token contains "bearer" at start
        Jwt.verify(token, jwtKey, (err, valid)=>{
            if(err){
                resp.status(401).send({error: "Invalid authorization ! Please login again"})
            }else{
                next();
            }
        })
    }else{
        resp.status(403).send({error: "No token"})
    }
}

app.listen(3000);


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