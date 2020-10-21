var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);
var bcrypt = require('bcrypt-nodejs');
// 34.00
// de 13,50 y 20,50


module.exports = function (app, passport) {


    app.get('/', isLoggedIn, function (req, res) {
        var row = [];
        var row2 = [];
        connection.query('select * from users where username = ?', [req.user.username], function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length) {
                    for (var i = 0, len = rows.length; i < len; i++) {  //query den gelen bütün parametreleri rows sınıfına ekliyoruz .
                        row[i] = rows[i];

                    }
                }
                console.log(row);

            }

            res.render('index', { usernames: row, status: "false" }); // user.ejs ye gönderiyoruz . 
        });
    });

    app.get('/mcu', function (req, res, next) {
        var usernames = '';
        console.log([req.user.username]);
        var row = "";
        row = [req.user.username.replace("@utpl.edu.ec", "")];
        var rol = "";
        rol = [req.user.rol]
        console.log([req.user.rol]);
        if (rol == "estudiante") {
            console.log("es estudiante");
            res.render('mcu', { usernames: row, status: "true", rol: "estudiante" });
        } else if (rol == "docente") {
            console.log("es docente");
            res.render('mcu', { usernames: row, status: "true", rol: "docente" });

        }

    });

    app.get('/reserva', function (req, res, next) {
        var usernames = '';
        var names = '';
        var lastNames = '';
        console.log([req.user.username]);
        var row = "";
        row = [req.user.username.replace("@utpl.edu.ec", "")];
        var rol = "";
        rol = [req.user.rol]
        var names2 = "";
        names2 = [req.user.name]
        console.log("sdas ", names2);
        var lastNames2 = "";
        lastNames2 = [req.user.lastName]
        console.log([req.user.lastName]);
        if (rol == "estudiante") {
            console.log("es estudiante");
            res.render('reserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: req.flash('ReservaMessage'), alert: 'ok' });
        } else if (rol == "docente") {
            console.log("es docente");
            res.render('reserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "docente", message: req.flash('ReservaMessage'), alert: 'ok' });

        }

    });

    app.post("/reserva", (req, res) => {
        const { name, lastName, email, date, startTime, endTime } = req.body;
        console.log({ name, lastName, email, date, startTime, endTime });
        var usernames = '';
        var names = '';
        var lastNames = '';
        console.log([req.user.username]);
        var row = "";
        row = [req.user.username.replace("@utpl.edu.ec", "")];
        var rol = "";
        rol = [req.user.rol]
        var names2 = "";
        names2 = [req.user.name]
        console.log("sdas ", names2);
        var lastNames2 = "";
        lastNames2 = [req.user.lastName]
        console.log([req.user.lastName]);

        connection.query("SELECT * FROM reservations WHERE date = ?", [date], function (err, rows) {
            if (err)
                return done(err);
            if (rows.length) {
                //return done(null, false, req.flash('ReservaMessage', 'Esta acupada la maqueta para esta fecha y hora.'));

                console.log('Esta acupada la maqueta para esta fecha y hora.');
                //alert('Esta acupada la maqueta para esta fecha y hora');
                alert2 = req.flash('ReservaMessage', 'Esta acupada la maqueta para esta fecha y hora.');
                res.render('reserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: 'Esta acupada la maqueta para esta fecha y hora.' });
                
                //return done(null, false, req.flash('loginMessage', 'Esta acupada la maqueta para esta fecha y hora.'));
            } else {
                connection.query('INSERT INTO reservations SET? ', { name, lastName, email, date, startTime, endTime }, (err, result) => {
                    res.redirect("/session");
                });
            }
        });

    });

    /*
    connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {

                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)
                    };

                    var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
    */


    app.get('/session', function (req, res) {
        var userName = [];
        console.log(userName);
        //res.render('index', {title: "salio", usernames: "enseñar", status: "false"});
        if ([req.user.username]) {
            console.log([req.user.username]);
            console.log("replace user ", [req.user.username.replace("@utpl.edu.ec", "")]);
            var usernames = req.param('username', null);
            var row = "";
            row = [req.user.username.replace("@utpl.edu.ec", "")];

            var logout = '<a href="/logout">Logout</a>';
            res.render('index.ejs', { title: "mi titulo dinamico", usernames: row, status: "true" });
        } else {

        }

    });

    app.get('/signup', function (req, res) {
        res.render('signup', { message: req.flash('message') });
    });

    /*app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup',
            failureFlash : true 
    }));*/
    app.post("/signup", (req, res) => {
        const { lastname, firstname, message } = req.body;
        console.log({ lastname, firstname, message });
        connection.query('INSERT INTO messages SET?', { firstname, lastname, message }, (err, result) => {
            res.redirect("/");
        });
    });


    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/session',
        failureRedirect: '/login',
        failureFlash: true
    }),
        function (req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/login', function (req, res) {

        res.render('login', { status: "false", message: req.flash('loginMessage') });

    });


};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

