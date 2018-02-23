var express = require('express');
var path = require('path');
var app = express();
var routes = require('./src/server/routes');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json());
routes(app);

//app.use(express.static(__dirname));
// Used for production build

//app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/uploads', express.static(process.cwd() + '/public/uploads'));


app.use(function(req, res, next) { //allow cross origin requests
     res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
     res.header("Access-Control-Allow-Origin", "http://localhost");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});

app.all('*/', function(req, res){
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, function(req, res){
	console.log('server running on port ' + PORT);
})