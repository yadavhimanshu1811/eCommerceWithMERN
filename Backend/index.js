require("dotenv").config();
const express = require("express"); //Backend framework
const cors = require("cors");  //allows frontend (React) to talk to backend
const mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET;

require("./db/config"); // DB connection

 //Importing Mongoose Models: These define shapes (schema) of User and Product documents in MongoDB.
const User = require("./db/User"); 
const Product = require("./db/Product");

const app = express();  //Initializing Express App
app.use(express.json());

// Allows your React frontend to make API requests. Without this → CORS error.
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://e-commerce-with-mern-kappa.vercel.app"
  ],
  credentials: true
}));

// =============================
//           SIGNUP
// =============================
app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  Jwt.sign({ result }, jwtKey, { expiresIn: "1y" }, (err, token) => {
    if (err) {
      return resp.send({ error: "Something went wrong" });
    }
    resp.send({ user: result, auth: token });
  });
});

// =============================
//           LOGIN
// =============================
app.post("/login", async (req, resp) => {
  if (!req.body.email || !req.body.password) {
    return resp.send({ error: "Email and password required" });
  }

  let user = await User.findOne(req.body).select("-password");

  if (user) {
    Jwt.sign({ user }, jwtKey, { expiresIn: "1y" }, (err, token) => {
      if (err) {
        return resp.send({ error: "Something went wrong" });
      }
      return resp.send({ user, auth: token });
    });
  } else {
    return resp.send({ error: "Invalid email or password" });
  }
});

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

// =============================
//      VERIFY TOKEN MIDDLEWARE
// =============================
function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ error: "Invalid authorization! Login again" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ error: "No token provided" });
  }
}

// =============================
//         PRODUCT ROUTES
// =============================
app.post("/addproduct", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/getproducts", verifyToken, async (req, resp) => {
  let product = await Product.find();
  resp.send(product);
});

app.get("/getproduct/:id", verifyToken, async (req, resp) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resp.status(400).send({ error: "Invalid product ID" });
  }

  const product = await Product.findById(id);

  if (!product) {
    return resp.status(404).send({ error: "No product found" });
  }

  resp.send(product);
});

app.put("/updateproduct/:id", verifyToken, async (req, resp) => {
  try {
    const result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    resp.send(result);
  } catch (error) {
    resp.send({"error": "Something went wrong !"});
  }
  
});

app.delete("/deleteproduct/:id", verifyToken, async (req, resp) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
  } catch (error) {
    resp.send({"error": "Something went wrong !"});
  }
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  // $or: OR operator in mongoDB | $options: "i" → case-insensitive | $regex allows partial matching 
  let result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
    ],
  });
  resp.send(result);
});

// =============================
//      START SERVER (IMPORTANT)
// =============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});