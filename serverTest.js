var express = require("express");
var app = express();
var fs = require("fs");
var __ = require("lodash");
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000 ;
var userRouter = express.Router();	

// var testPostData = { name:"Harish",age:22};



userRouter.route('/').get(function(req,res){				//Read all person
	 var data =fs.readFileSync(__dirname+'/user.json');
	 data = JSON.parse(data);
	 res.send(data);
})
.post(function(req,res){									//Insert new person
	var data = fs.readFileSync(__dirname+'/user.json');
	data = JSON.parse(data);
	data.push(req.body);
	data = JSON.stringify(data);
	fs.writeFileSync(__dirname+'/user.json',data);
	res.end();
});

userRouter.route('/:name').get(function(req,res){              //Read a specific person
	 var data =fs.readFileSync(__dirname+'/user.json');
	 data = JSON.parse(data);
	 res.send(__.find(data,{"name":req.params.name}));
})
.delete(function(req,res){										//Delete a person
	var data = fs.readFileSync(__dirname+'/user.json');
	data = JSON.parse(data);
	__.remove(data,__.find(data,{"name":req.params.name}));
	data = JSON.stringify(data);
	fs.writeFileSync(__dirname+'/user.json',data);
	res.end();	
})
.put(function(req,res){
	var data=fs.readFileSync(__dirname+'/user.json');
	data = JSON.parse(data);
	data = data.filter(function(item){								//Replace age
		if(item.name == req.params.name){
			item.age = req.body.age; console.log(req.body);
			//object cannot be directly changed (item = req.body) wont work		
		}
		return item;
	});
	data = JSON.stringify(data);
	fs.writeFileSync(__dirname+'/user.json',data);
	res.send("New Data:\n"+data);
});






//==================================================
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
//==================================================

app.use('/user',userRouter);								
app.listen(port,function(){
	console.log("Running @ port "+port);
});

























	// ===================
	// 	TEST CASES
	// ===================


					// app.get('/',function(req,res){
					// 	res.send("Hello World");
					// });

					// app.post('/',function(req,res){
					// 	res.send("Post Hello");
					// });



