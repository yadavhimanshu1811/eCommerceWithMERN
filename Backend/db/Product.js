const mongoose = require("mongoose");
require("./User"); 
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    company: String,
    contact: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    image: {
        type: String,
        required: false,
    }

});
module.exports = mongoose.model("products", productSchema);   //products: table name in db