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

    app.get('/listReserva', function (req, res, next) {
        var userName = [];
        var usernames = '';
        var names = '';
        var lastNames = '';
        var row = "";
        row = [req.user.username.replace("@utpl.edu.ec", "")];
        var rol = "";
        var names2 = "";
        var lastNames2 = "";
        rol = [req.user.rol]
        console.log([req.user.username]);
        usernames = [req.user.username];
        names2 = [req.user.name]
        console.log("sdas ", names2);
        lastNames2 = [req.user.lastName]
        console.log([req.user.lastName]);
        var hoy = new Date();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        var fechaDia = hoy.getDate();
        var fechaDia2 = "";
        if (fechaDia < 10){
            fechaDia2 = "0"+ fechaDia;
            var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + fechaDia2;
        } else {
            var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
        }
        
        console.log(hora);
        console.log(fecha);
        var idList = "";
        var nameList = "";
        var lastNameList = "";
        var email2 = "";
        var date2 = "";
        var startTime2 = "";
        var endTime2 = "";
        var mockup2 = "";
        var result2 = [];
        connection.query("SELECT * FROM reservations ", function (err, result) {
            //connection.query("SELECT * FROM reservations ", (err, result) => {
            console.log(result);
            if (rol == "estudiante") {
                for (var i = 0; i < result.length; i++) {
                    nameList = result[i].name;
                    lastNameList = result[i].lastName;
                    email2 = result[i].email;
                    date2 = result[i].date;
                    startTime2 = result[i].startTime;
                    endTime2 = result[i].endTime;
                    mockup2 = result[i].mockup;
                    
                    
                    if (usernames == email2) {
                        if (fecha == date2 && hora >= startTime2 && hora <= endTime2) {
                            console.log("sesion2");
                            console.log(startTime2);
                            result2.push({ name: nameList, lastName: lastNameList, date: date2, startTime: startTime2, endTime: endTime2 , mockup: mockup2, time: "si"},);
                        } else if (fecha == date2) {
                            console.log("sesion3");
                            console.log(startTime2);
                            result2.push({ name: nameList, lastName: lastNameList, date: date2, startTime: startTime2, endTime: endTime2 , mockup: mockup2, time: "no"},);
                        }
                    }
                }
                console.log(result2);
                console.log("es estudiante");
                
                res.render('listReserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: req.flash('ReservaMessage'), data2: result2 , dataTime2: "no",});
            } else if (rol == "docente") {
                console.log("es docente");

                for (var i = 0; i < result.length; i++) {
                    nameList = result[i].name;
                    lastNameList = result[i].lastName;
                    email2 = result[i].email;
                    date2 = result[i].date;
                    startTime2 = result[i].startTime;
                    endTime2 = result[i].endTime;
                    mockup2 = result[i].mockup;
                    
                    if (fecha == date2 ) {
                        console.log("sesion2");
                        console.log(startTime2);
                        result2.push({ name: nameList, lastName: lastNameList, date: date2, startTime: startTime2, endTime: endTime2, mockup: mockup2, time: "no" },);
                    } 
                }
                res.render('listReserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "docente", message: req.flash('ReservaMessage'), data2: result2, dataTime2: "si" });
            } else if (rol == "admin") {
                console.log("es admin");

                for (var i = 0; i < result.length; i++) {
                    nameList = result[i].name;
                    lastNameList = result[i].lastName;
                    email2 = result[i].email;
                    date2 = result[i].date;
                    startTime2 = result[i].startTime;
                    endTime2 = result[i].endTime;
                    mockup2 = result[i].mockup;
                    
                    if (fecha == date2 ) {
                        console.log("sesion2");
                        console.log(startTime2);
                        result2.push({ name: nameList, lastName: lastNameList, date: date2, startTime: startTime2, endTime: endTime2, mockup: mockup2, time: "no" },);
                    } 
                }
                res.render('listReserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "admin", message: req.flash('ReservaMessage'), data2: result2, dataTime2: "si" });
            }
        });
    });


    app.get('/project', function (req, res, next) {
        var userName = [];
        var usernames = '';
        var names = '';
        var lastNames = '';
        var row = "";
        row = [req.user.username.replace("@utpl.edu.ec", "")];
        var rol = "";
        var names2 = "";
        var lastNames2 = "";
        rol = [req.user.rol]
        console.log([req.user.username]);
        usernames = [req.user.username];
        names2 = [req.user.name]
        console.log("sdas ", names2);
        lastNames2 = [req.user.lastName]
        console.log([req.user.lastName]);
        var hoy = new Date();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        var fechaDia = hoy.getDate();
        var fechaDia2 = "";
        if (fechaDia < 10){
            fechaDia2 = "0"+ fechaDia;
            var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + fechaDia2;
        } else {
            var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
        }
        
        console.log(hora);
        console.log(fecha);
        var idList = "";
        var nameList = "";
        var lastNameList = "";
        var email2 = "";
        var date2 = "";
        var startTime2 = "";
        var endTime2 = "";
        var mockup2 = "";

                
        connection.query("SELECT * FROM listProject ", function (err, result2) {
            
            if (rol == "estudiante") {
                connection.query("SELECT * FROM reservations where date ='"+fecha+"'", function (err, result) {
                    //connection.query("SELECT * FROM reservations ", (err, result) => {
                        console.log(result);
                    for (var i = 0; i < result.length; i++) {
                        nameList = result[i].name;
                        lastNameList = result[i].lastName;
                        email2 = result[i].email;
                        date2 = result[i].date;
                        startTime2 = result[i].startTime;
                        endTime2 = result[i].endTime;
                        mockup2 = result[i].mockup;
                        
                        
                        if (fecha == date2 && hora >= startTime2 && hora <= endTime2) {
                            mockupStatus = {codeModels: mockup2, satatusModels: "ocupada", nameStatuss: "name",  userNameStatus: email2}   
                        }

                    }
                res.render('project', {usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: req.flash('ReservaMessage'), result2: result2, result: result});
                });
            } else if (rol == "docente") {
                connection.query("SELECT * FROM reservations where date ='"+fecha+"'", function (err, result) {
                    //connection.query("SELECT * FROM reservations ", (err, result) => {
                        console.log(result);
                    for (var i = 0; i < result.length; i++) {
                        nameList = result[i].name;
                        lastNameList = result[i].lastName;
                        email2 = result[i].email;
                        date2 = result[i].date;
                        startTime2 = result[i].startTime;
                        endTime2 = result[i].endTime;
                        mockup2 = result[i].mockup;
                        
                        if (fecha == date2 && hora >= startTime2 && hora <= endTime2) {
                            mockupStatus = {codeModels: mockup2, satatusModels: "ocupada", nameStatuss: "name",  userNameStatus: email2}   
                        }

                        console.log(mockupStatus);
                        list = {mockupStatus: mockupStatus}
                    }
                res.render('project', {usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "docente", message: req.flash('ReservaMessage'), result2: result2, result: result});
                });
            } else if (rol == "admin") {
                connection.query("SELECT * FROM reservations where date ='"+fecha+"'", function (err, result) {
                    //connection.query("SELECT * FROM reservations ", (err, result) => {
                        console.log(result);
                    for (var i = 0; i < result.length; i++) {
                        nameList = result[i].name;
                        lastNameList = result[i].lastName;
                        email2 = result[i].email;
                        date2 = result[i].date;
                        startTime2 = result[i].startTime;
                        endTime2 = result[i].endTime;
                        mockup2 = result[i].mockup;
                        
                        if (fecha == date2 && hora >= startTime2 && hora <= endTime2) {
                            mockupStatus = {codeModels: mockup2, satatusModels: "ocupada", nameStatuss: "name",  userNameStatus: email2}   
                        }

                    }
                res.render('project', {usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "admin", message: req.flash('ReservaMessage'), result2: result2, result: result});
                });
            }
            
        });
              
    });


    app.get('/mcu', function (req, res, next) {
        var userName = [];
        var usernames = '';
        var names = '';
        var lastNames = '';
        var row = "";
        row = [req.user.username.replace("@utpl.edu.ec", "")];
        var rol = "";
        var names2 = "";
        var lastNames2 = "";
        rol = [req.user.rol]
        console.log([req.user.username]);
        usernames = [req.user.username];
        names2 = [req.user.name]
        console.log("sdas ", names2);
        lastNames2 = [req.user.lastName]
        console.log([req.user.lastName]);
        var hoy = new Date();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        var fechaDia = hoy.getDate();
        console.log(fechaDia);
        var fechaDia2 = "";
        if (fechaDia < 10){
            fechaDia2 = "0"+ fechaDia;
            var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + fechaDia2;
        } else {
            var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
        }
        
        console.log(hora);
        console.log(fecha);
        var email2 = "";
        var date2 = "";
        var startTime2 = "";
        var endTime2 = "";
        var mockup2 = "";
        var result2 = [];
        var time = "no";
        var satatusModel = "libre";
        var nameStatus = "noName";

        connection.query("SELECT * FROM reservations ", function (err, result) {
                if (rol == "estudiante") {
                    for (var i = 0; i < result.length; i++) {
                        email2 = result[i].email;
                        date2 = result[i].date;
                        startTime2 = result[i].startTime;
                        endTime2 = result[i].endTime;
                            if (fecha == date2 && hora >= startTime2 && hora <= endTime2) {
                                if (usernames == email2) {
                                    time = "si";
                                }
                            } 
                    }
                    console.log(time);
                    console.log("es estudiante");
                    res.render('mcu', { usernames: row, names: names2, lastNames: lastNames2,  status: "true", rol: "estudiante", dataTime: time});
                } else if (rol == "docente") {
                    console.log("es docente");
    
                    for (var i = 0; i < result.length; i++) {
                        email2 = result[i].email;
                        date2 = result[i].date;
                        startTime2 = result[i].startTime;
                        endTime2 = result[i].endTime;
                        if (fecha == date2 ) {
                            if (usernames == email2) {
                                time = "si";
                            }
                        } 
                    }
                    res.render('mcu', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "docente",  dataTime: "no"});
                }
        });
        
       

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

        connection.query("SELECT * FROM listProject ", function (err, result2) {
            if (rol == "estudiante") {
                console.log("es estudiante");
                res.render('reserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: req.flash('ReservaMessage'), result2: result2});
            } else if (rol == "docente") {
                console.log("es docente");
                res.render('reserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "docente", message: req.flash('ReservaMessage'), result2: result2 });
            } else if (rol == "admin") {
                console.log("es admin");
                res.render('reserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "admin", message: req.flash('ReservaMessage'), result2: result2 });
            }
        });


    });

    app.post("/reserva", (req, res) => {
        const { name, lastName, email, date, startTime, endTime, mockup} = req.body;
        console.log({ name, lastName, email, date, startTime, endTime, mockup });
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
        var hoy = new Date();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        var fechaDia = hoy.getDate();
        var fechaDia2 = "";
        if (fechaDia < 10){
            fechaDia2 = "0"+ fechaDia;
            var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + fechaDia2;
        } else {
            var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
        }
        console.log(hora);
        console.log(fecha);
        console.log("desde el from: ",date);
        connection.query("SELECT * FROM reservations WHERE date = ? and startTime = ?  and endTime = ? and mockup = ?", [date, startTime, endTime, mockup], function (err, rows) {
            if (err)
                return done(err);
            if (rows.length) {
                alert2 = req.flash('ReservaMessage', 'Esta acupada la maqueta para esta fecha y hora.');
                res.render('reserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: 'Esta acupada la maqueta para esta fecha y hora.' });
            } else {
                if(date >= fecha){
                    var hora2 = hora.replace(":00:00", "");
                    
                    if(startTime < endTime){
                        var startTimeRest = startTime.replace(":00:00", "");
                        var endTimeRest = endTime.replace(":00:00", "");
                        var timeRest = endTimeRest - startTimeRest;
                        var timeResult = 1
                        console.log("la resta es: ", timeRest);
                        if (timeRest == timeResult){
                            connection.query('INSERT INTO reservations SET? ', { name, lastName, email, date, startTime, endTime, mockup }, (err, result) => {
                                res.redirect("/project");
                            });
                        } else {
                            res.render('reserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: 'Error, el máximo tiempo de uso puede ser una hora.' });
                        }
                        
                    } else {
                        res.render('reserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: 'Error, la hora de ingreso debe ser menor que la de salida' });
                    }
                         
                } else {
                    res.render('reserva', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: 'Error, la fecha esta fuera de rango. Debe de ser superior o la actual al día' });
                }
            }
        });

    });


    // añadir más maquetas
    app.get('/moreModels', function (req, res, next) {
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
            res.render('moreModels', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: req.flash('ReservaMessage') });
        } else if (rol == "docente") {
            console.log("es docente");
            res.render('moreModels', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "docente", message: req.flash('ReservaMessage') });
        } else if (rol == "admin") {
            console.log("es admin");
            res.render('moreModels', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "admin", message: req.flash('ReservaMessage') });
        }


    });

    app.post("/moreModels", (req, res) => {
        const {  codeModel, nameModel, subtitlesModel, description, urlMaqueta} = req.body;
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

        connection.query("SELECT * FROM listProject WHERE codeModel = ? and urlMaqueta = ? ", [codeModel, urlMaqueta], function (err, rows) {
            if (err)
                return done(err);
            if (rows.length) {
                alert2 = req.flash('ReservaMessage', 'Esta maqueta ya esta registrada');
                res.render('moreModels', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: 'Esta maqueta ya esta registrada'});
            } else {
                
                connection.query('INSERT INTO listProject SET? ', { codeModel, nameModel, subtitlesModel, description, urlMaqueta}, (err, result) => {
                    res.redirect("/project");
                });
                        
            }
        });

    });

    app.get('/session', function (req, res) {
        var userName = [];
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
            res.render('index', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "estudiante", message: req.flash('ReservaMessage'), alert: 'ok' });
        } else if (rol == "docente") {
            console.log("es docente");
            res.render('index', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "docente", message: req.flash('ReservaMessage'), alert: 'ok' });
        }
        else if (rol == "admin") {
            console.log("es admin");
            res.render('index', { usernames: row, names: names2, lastNames: lastNames2, status: "true", rol: "admin", message: req.flash('ReservaMessage'), alert: 'ok' });
        }

    });

    app.get('/signup', function (req, res) {
        res.render('signup', { message: req.flash('message') });
    });

    app.post("/signup", (req, res) => {
        const { lastname, firstname, message } = req.body;
        console.log({ lastname, firstname, message });
        connection.query('INSERT INTO messages SET?', { firstname, lastname, message }, (err, result) => {
            res.redirect("/project");
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/project',
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
            res.redirect('/project');
        });
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
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

