var express = require("express");
var app = express();
var fs = require("fs");
var __ = require("lodash");
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000 ;
var userRouter = express.Router();	
//function to read from file and convert to JSON
function readData(){

		var data =fs.readFileSync(__dirname+'/user.json');	
	 	data = JSON.parse(data);
	 	return data;
}


//=========================Read all person ========================================

userRouter.route('/').get(function(req,res){				
	 var data =readData();
	 res.send(data);
})

//==========================Insert new person ====================================

.post(function(req,res){									
	var data = readData();
	data.push(req.body);
	data = JSON.stringify(data);
	fs.writeFileSync(__dirname+'/user.json',data);
	res.end();
});

//========================Read a specific person ==============================

userRouter.route('/:name').get(function(req,res){              
	 var data =readData();
	 var response = __.find(data,{"name":req.params.name});

	 if(response === undefined){
	 				
	 				res.send("User Not Found\nTry again");
	 }

	 else{
	 		res.send(response);
	}
})

//======================Delete a person=====================================

.delete(function(req,res){										
	var data = readData();
	var response = __.find(data,{"name":req.params.name});

	 if(response === undefined){
	 				
	 				res.send("User Not Found\nTry again");
	 }

	 else{
					__.remove(data,response);
					data = JSON.stringify(data);
					fs.writeFileSync(__dirname+'/user.json',data);
					res.end();
	}	
})

//============================Replace age================================

.put(function(req,res){
	var data=readData();
	var response = __.find(data,{"name":req.params.name});

	 if(response === undefined){

	 				res.send("User Not Found\nTry again");

	 }

	 else{
			data = data.filter(function(item){	
														
				if(item.name == req.params.name){
											
						item.age = req.body.age; console.log(req.body);
						//object cannot be directly changed (item = req.body) wont work		
				}
			return item;
			});
			data = JSON.stringify(data);
			fs.writeFileSync(__dirname+'/user.json',data);
			res.send("New Data:\n"+data);
		}
});






//==================================================
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
//==================================================

app.use('/user',userRouter);								
app.listen(port,function(){
	console.log("Running @ port "+port);
});



