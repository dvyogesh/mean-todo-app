var express = require('express');
var app = express();
var routes = require('./src/server/routes');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000
app.use(bodyParser.json());
routes(app);
app.all('*/', function(req, res){
	res.send('\
		<html>\
		<head>\
			<base href="/">\
		</head>\
		<body>\
			<div class="container">\
			<div ui-view ></div>\
			</div>\
			<script src="bundle.js">\
			</script>\
			<h1>\
			hellow super just cool man\
			</h1>\
		</body>\
		</html>\
		');
});

app.listen(PORT, function(req, res){
	console.log('server running on port ' + PORT);
})