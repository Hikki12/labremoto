var dbconfig = require('../config/database');
var mysql = require('mysql');
var connection = mysql.createConnection(dbconfig.connection);
var bcrypt = require('bcrypt-nodejs');



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

            res.render('index', { usernames: row, status: "false"}); // user.ejs ye gönderiyoruz . 
        });
    });

    app.get('/mcu',function(req,res, next){
        var usernames= req.param('username', null);  
        var row = "";
            row = [req.user.username];

        res.render('mcu', {usernames: row, status: "true"});
    });

    app.get('/session', function (req, res) {
        var userName = [];
        console.log(userName);
        //res.render('index', {title: "salio", usernames: "enseñar", status: "false"});
        if ([req.user.username]) {
            console.log([req.user.username]);
            var usernames= req.param('username', null);  
            var row = "";
            row = [req.user.username];
            var logout = '<a href="/logout">Logout</a>';
            res.render('index.ejs', { title: "mi titulo dinamico" , usernames: row, status: "true"});
        } else {
            
        }
        
        
    });

    app.get('/login', function (req, res) {

        res.render('login', { message: req.flash('loginMessage') });

    });

    app.get('/signup', function (req, res) {
        res.render('signup', { message: req.flash('message') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/session',
        failureRedirect: '/signup',
        failureFlash: true
    }));

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


};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

