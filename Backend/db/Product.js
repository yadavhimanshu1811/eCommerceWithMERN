const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userID: String,
    company: String

});
module.exports = mongoose.model("products", productSchema);   //products: table name in db