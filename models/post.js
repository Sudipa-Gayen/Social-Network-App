const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    text:{type:String,required:true},
    timestamp:{type:Date,default: Date.now},
});

module.exports=mongoose.model('Post',postSchema);