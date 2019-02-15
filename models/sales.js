var mongoose=require("mongoose");

var saleschema=new mongoose.Schema({
	SerialNo:Number,
	ItemCode:String,
	ItemName:String,
	UnitPrice:Number,
	Quantity:{type:Number,default:0},
	Price:Number,
	Sold:Number
});

module.exports=mongoose.model("sale",saleschema);
