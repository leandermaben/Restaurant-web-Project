const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const dishSchema=new Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dish'
    }
});

const favoriteSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dishes:[dishSchema]
},{timestamps:true});
module.exports=mongoose.model('Favourite',favoriteSchema);