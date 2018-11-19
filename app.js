var express = require("express");
var bodyParser = require("body-parser");
var Car = require("./models/car");
var fs = require("fs");
var app = express();
app.use("/node_modules", express.static("./node_modules/"));

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

//首页
app.get("/", function(req, res) {
	fs.readFile("./demo-shopmanager.html", function(error, data) {
		if(error) {
			console.log("读取失败")
		} else {
			//console.log(data);
			res.send(data.toString());
		}
	});
})

//查询数据
app.get("/shopList", function(req, res) {
	Car.find(function(err, docs) {
		if(err) {
			return req.status(500).send("error");
		}
		return res.send("callback(" + JSON.stringify(docs) + ")");
	})

})

//添加数据
app.post("/add", function(req, res) {
	new Car(req.body).save(function(err, docs) {
		if(err) {
			return req.status(500).send("error");
		}
		return res.status(200).send("success save")
	})
})

//删除数据
app.post("/del", function(req, res) {
	Car.findOne({
		_id: req.body._id
	}, function(err, datas) {
		if(err) {
			return req.status(500).send("error");
		}
		Car.deleteOne(datas, function(err) {
			if(err) {
				return req.status(500).send("error");
			}
			return res.status(200).send("success del");
		})
	})
})

//批量加数据
//app.get("/addtest", function(req, res) {
//	Car.create(shop,function(err, docs) {
//		if(err) {
//			return req.status(500).send("error");
//		}
//		return res.status(200).json({
//			err_code: 0,
//			message: 'ok'
//		})
//	})
//})

app.listen(3000, function() {
	console.log("listening")
})