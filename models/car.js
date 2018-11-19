var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/test",{useNewUrlParser:true});
var Schema=mongoose.Schema;

var carSchema=new Schema({
	name:{
		type:String,
		require:true
	},
	ctime:{
		type:Date,
		default:new Date
	}
})

module.exports=mongoose.model("Car",carSchema);
