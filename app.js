var express=require("express");
app=express();
mongoose=require("mongoose");
bodyParser=require("body-parser");

mongoose.connect("mongodb://localhost/sales",{useNewUrlParser:true});
var sale=require("./models/sales");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/",function(req,res){

	sale.find({},function(err,sale)
	{if(err)
		console.log(err);
		else
     res.render("ui",{sales:sale});

	})

});
app.get("/add",function(req,res)
{
	res.render("addtodb");
});


app.post("/add",function(req,res)
{ 
	sale.findOne({ItemName:req.body.sale.ItemName},function(err,product)
	{
		if(err)
			console.log(err);
		
	else if(product===null)
      {
      
 			sale.create(req.body.sale,function(err,newc)
	    {
		if(err)
			console.log(err);
		else
			{
				console.log(newc);
			res.redirect("/");
		  }
	   });
	}
	
    else
    {console.log(product);
    	var a=Number(product.Quantity);
    	var b=Number(req.body.sale.Quantity);
      a=a+b;
      product.Quantity=a;
       product.save();
       res.redirect("/");
    }
	});
	
}
);
app.get("/delete",function(req,res)
{
	res.render("delete");
});
app.post("/delete",function(req,res){

sale.deleteOne({ItemName:req.body.item},function(err)
{
	if(err)
		console.log(err);
	else
		res.redirect("/");
})
});
app.get("/:id/sell",function(req,res)
{
	 sale.findById(req.params.id,function(err,product)
    {if(err)
    	console.log(err);
    	else
    	
    	res.render("sell",{sell:product});
    })
 
});
app.post("/:id/sell",function(req,res)
{
    sale.findById(req.params.id,function(err,product)
    {
    	var a=product.Quantity;
    	var b=req.body.quantity;
    	if(a>=b)
    		{

    			a=a-b;
    			product.Quantity=a;
    			product.Sold=b;
    			product.save();
    		
    		    res.redirect("/");
    		}
    		else
    		{console.log("Insufficient amount")
    			res.redirect("/");
    		}
    })
});
app.get("/cancel",function(req,res)
{
	sale.find({},function(err,key)
    {
    	if(err)
    		console.log(err);
    	else
    	{
    		for(var a=0;a<key.length;a++)
    		{
    			key[a].Quantity=key[a].Quantity+key[a].Sold;
    		key[a].Sold=0;
    		key[a].save();
    	}
    		res.redirect("/")
    	}
    	
    });
});
app.get("/bill",function(req,res)
{

sale.find({},function(err,key)
    {
    	if(err)
    		console.log(err);
    	else
    	{

    				res.render("bill",{sale:key});

    	
    	}
    	
    });
})
app.listen(8081,function()
{
console.log("server rocked");
});