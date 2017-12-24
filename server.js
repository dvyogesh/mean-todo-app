var express = require('express');
var path = require('path');
var app = express();
var routes = require('./src/server/routes');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000
app.use(bodyParser.json());
routes(app);
app.use(express.static(__dirname));
// Used for production build
app.use(express.static(path.join(__dirname, 'public')));
app.all('*/', function(req, res){
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, function(req, res){
	console.log('server running on port ' + PORT);
})