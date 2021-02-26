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
const { publicDecrypt } = require('crypto');


require('./config/passport.js')(passport); 
require('./app/videostream.js')(app);
require('./app/downloads.js')(app);
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
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(__dirname + '/public'));

// obtiene la ruta del directorio publico donde se encuentran los elementos estaticos (css, js).
var publicPath = path.resolve(__dirname, '/public'); //path.join(__dirname, 'public'); también puede ser una opción

// Para que los archivos estaticos queden disponibles.
app.use(express.static(publicPath));

//Rutas
app.get('/',function(request,res){
	console.log("asdas");
    res.render('index', {title: "salio", usernames: "enseñar", status: "false", rol: "ninguno"});
});


app.post('/file_upload', upload.any(), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  //console.log(req.file);
  res.end()
})


//start server
const server = app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));

}, '0.0.0.0');

// ----------------------------------------------
const io = SocketIO(server);
const ManagerIO = require('./ManagerIO')(io)

ManagerIO.on('quizReceived', (quiz)=>{
  console.log(quiz);
})

// ---------------------------------------------- 

// required for passport
app.use(session({
    secret: 'kodizimcomisrunning',
    resave: true,
	saveUninitialized: true,
	cookie: { secure: false } // no https so secure is false
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
// To parse the data of a form
app.use(bodyParser.urlencoded({ extended: false }));

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


