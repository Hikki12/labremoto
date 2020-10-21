var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    passport.use(
        'local-signup',
        new LocalStrategy({

           /* nameField : 'name',
            lastNameField : 'lastName',
            usernameField : 'username',
            passwordField : 'password',
            rolField : 'rol',*/
            lastnameField : 'lastname',
            firstnameField : 'firstname',
            messageField : 'message',
            passReqToCallback : true 
        },
        function(req, lastname, firstname, message, done) {

            /*connection.query("SELECT * FROM mess WHERE name = ?",[name], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    

                    var insertQuery =  "(?,?,?,?,?)";
                    // ( name, lastName, username, password, rol ) values
                    connection.query("INSERT INTO users SET?",  { name,lastName, username, password, rol });
                }
            });*/
            connection.query("INSERT INTO messages SET?",  { lastname,firstname, message});
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true 
        },
        function(req, username, password, done) { 
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'bulunamadi.')); 
                }

           
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'yanlis parola.'));

          
                return done(null, rows[0]);
            });
        })
    );

    passport.use(
        'local-reserva',
        new LocalStrategy({

            nameField : 'name',
            lastNameField : 'lastName',
            emailField : 'email',
            dateField : 'date',
            startTimeField : 'startTime',
            endTimeField : 'endTime',
            passReqToCallback : true 
        },
        function(req, name, lastName, email,  date, startTime, endTime, done) {
            console.log("no llega")
            connection.query("SELECT * FROM reservations WHERE date = ?",[date], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That reserva is already taken.'));
                } else {
                    var newMysql = {
                        name: name,
                        lastName:lastName,
                        email: email,
                        date: date,
                        startTime: startTime,
                        endTime: endTime

                    };
                    var insertQuery = "INSERT INTO reservations (name, lastName, email, date, startTime, endTime ) values (?,?,?,?,?,?)";
                    connection.query(insertQuery,[newMysql.name, newMysql.lastName, newMysql.email, newMysql.date, newMysql.startTime, newMysql.endTime],function(err, rows) {
                        newMysql.id = rows.insertId;

                        return done(null, newMysql);
                    });
                }
            });
        })
    );

};