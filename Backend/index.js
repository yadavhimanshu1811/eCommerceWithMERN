require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET;

// DB connection
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://e-commerce-with-mern-8twte741h.vercel.app"
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

  Jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
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
    Jwt.sign({ user }, jwtKey, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        resp.send({ error: "Something went wrong" });
      }
      resp.send({ user, auth: token });
    });
  } else {
    resp.send({ error: "Invalid email or password" });
  }
});

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
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );

  resp.send(result);
});

app.delete("/deleteproduct/:id", verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
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