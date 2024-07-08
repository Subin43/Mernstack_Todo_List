const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({name:String});

module.exports = mongoose.model("todo", todoSchema);
