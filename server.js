const path = require('path');
const express = require('express');
const SocketIO = require('socket.io');
const app = express();
const bodyParser = require('body-parser')
var multer  = require('multer')


var dbconfig = require('./config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var passport = require('passport');
var flash    = require('connect-flash');
require('./config/passport.js')(passport); 

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());




var storage = multer.diskStorage( {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname);
        }
    }
);	

var upload = multer( { storage: storage } );


//settings 
app.set('port',process.env.PORT||3000);

// motor de plantilla
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//static files
app.use(express.static(path.join(__dirname,'public')));

//Rutas
app.get('/',function(request,res){
    res.render('index', {title: "salio", usernames: "enseñar", status: "false"});
});

app.get('/login',function(request,res){
    res.render('login', {status: "false"});
});

app.get('/project',function(request,res){
    res.render('project', {status: "false"});
});



app.post('/file_upload', upload.any(), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  //console.log(req.file);
  res.end()
})


//start server
const server = app.listen(app.get('port'), () => {
	console.log('server on port ',app.get('port'));

});


//websockets
var clients = [];
const io = SocketIO(server);

var control_busy = false;
var master = "";
var user = "";
var variables_data ={
	Mode:false,
	Radio: 1,
	RPM: 0,
	Steps: 0,
	PlayState: false,
	Recording: false,
	RecordingAvailable:false,
	DirState: false,
	RecordingTime: false,
	StableSpeed:false,
	Busy:false
};

io.on('connection', (socket)=> {
	//indx_busy++;

	clients.push(socket.id);
	console.log(clients);
	
	//recive updates coming fron web client
	socket.on('updates_from_js_client',(data) =>{
		//socket.broadcast.emit('updates_from_server',data);	
		socket.broadcast.emit('updates_from_server_to_python',data);

		console.log('Updates from js client: ',data);
		//variables_data = data;
		//data_available = true;
		//console.log(data_available);
	});	

	//recive updates coming from python client and send it to the web client
	socket.on('updates_from_python_client',(data) =>{
			variables_data = data;
			socket.broadcast.emit('updates_from_server',data);
			console.log("Python updates: ",data);

	});

	//Alert to the client 
	socket.on('record_ok',(data) =>{
		//io.emit('alert_record',data);
	});



	//image reception 
	socket.on('imgStream_server',(data)=>{
		io.emit('img_update',data);
	
	});

	socket.on('request_control',()=>{
		io.emit('updates_from_server',variables_data);
	})


	socket.on('disconnect',function(){
		var i = clients.indexOf(socket);
		clients.splice(i,1);
		//console.log("Desconectado: ",socket.id);
		console.log(clients);

	});


});

// required for passport
app.use(session({
    secret: 'kodizimcomisrunning',
    resave: true,
    saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

