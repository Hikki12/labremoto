
var screen = $('#loading-screen');
configureLoadingScreen(screen);

//obtener valor del id
var codeModel = $('#codeModel').val();
console.log(codeModel);

var urlData  = "../data/data2.json";
var i = 0;


console.log('cardando URL');
$.ajax({
    url: urlData,
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function (data, textStatus, xhr) {
        
        var div = '';
        console.log('Toda los Datos registrados')
        for ( var x in data) {
            var type = data[x].type;
            var id = data[x].id;
            var statement = data[x].statement;
            div += '<hr><div class="form-group row">'+
            '<label class="col-sm-12 text-left">'+ statement +' </label>';
            if (type == "text"){
                div += '<div class="col-sm-10">'+
                '<input type="text" class="form-control" placeholder="su respuesta es..." value="" name="text'+x+'" id="text'+x+'">'+
                '</div></div>';
            } else if (type == "check"){
                var trueCheck = 0;
                var falseCheck = 0;
                div += '<div class="form-check col-sm-2">';
                for (var i in data[x].answers) {
                    var value = data[x].answers[i].value;
                    var correct = data[x].answers[i].correct;
                    var ij = i + 1;
                    div += '<input class="form-check-input" type="checkbox" name="exampleChecks'+x+'"  value="'+ correct +'">'+
                        '<label class="form-check-label">   '+
                        + value +
                        '</label> <br>';
                    if (correct.toString() == "true") {
                        trueCheck = trueCheck + 1;
                        
                    } else if(correct.toString() == "false"){
                        falseCheck = falseCheck + 1;
                    }
                    
                    i++; 
                }
                div += '</div></div>';
                div += '<input type="text" class="form-control" id="trueCheck'+x+'" value="'+ trueCheck +'" style="display: none;">';
                div += '<input type="text" class="form-control" id="falseCheck'+x+'" value="'+ falseCheck +'" style="display: none;">';
                
            } else if (type == "radio"){
                div += '<div class="form-check col-sm-2">';
                for (const i in data[x].answers) {
                    var value = data[x].answers[i].value;
                    var correct = data[x].answers[i].correct;
                    var ij = i + 1;
                    div += '<input class="form-check-input" type="radio" id="inlineRadio'+x+'" name="exampleRadios'+x+'" value="'+ correct +'">'+
                        '<label class="form-check-label for="inlineRadio'+x+'"> '+
                        + value +
                        '</label> <br>';
                        
                }
                div += '</div></div>';
            }
            x++;
        };//end for

        //total de preguntas:
        var total = x - 1;
        div += '<input type="text" class="form-control" id="totalPreguntas" value="'+ total +'" style="display: none;">';
        
        $("#quiz").append(div);
    },
    error: function (data) {
        alert('Error');
        $("#error-500").show();
    }
});//end ajax

function configureLoadingScreen(screen){
$(document)
    .ajaxStart(function () {
        screen.fadeIn();
    })
    .ajaxStop(function () {
        screen.fadeOut();
    });
}
function myFunction() { 

$("#modalLoginForm").modal('hide');

//obtener valor de totalPreguntas
var totalPreguntas = $('#totalPreguntas').val();
const valorPregunta = (10/totalPreguntas).toFixed(2);
console.log("valorPregunta ", valorPregunta);

var hoy = new Date();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
console.log(fecha, " -- ", hora);

var textValue = "";
var checkBox = "";
var radioBox = "";

var sumaText = 0;
var sumaCheck = 0;
var sumaCheck2 = 0;
var sumaRadio = 0;
var sumaRadio2 = 0;
var sumaCheckResta = 0;
var sumaCheckResta2 = 0;

var urlData  = "../data/data2.json";
var i = 0;
console.log('cardando URL');
$.ajax({
    url: urlData,
    type: 'GET',
    dataType: 'json',
    data: {},
    success: function (data, textStatus, xhr) {
        var div = '';
        console.log('Toda los Datos para calificar')
        for ( var x in data) {
            var type = data[x].type;
            var id = data[x].id;
            var statement = data[x].statement;
            console.log("id- ", x);

            if (type == "text"){
                //obtener valor del id
                var texto = "#text" + x;
                textValue = $(texto).val();
                for (var i in data[x].answers) {
                    var value = data[x].answers[i].value;
                    if (textValue == value){
                        sumaText = parseFloat(sumaText) + parseFloat(valorPregunta);
                    }
                }
                
            } else if (type == "check"){
                //obtener valor de trueCheck y falseCheck
                var trueCheck = $('#trueCheck'+x).val();
                var trueCheckResult = (valorPregunta/trueCheck).toFixed(2);
                console.log("trueCheckResult ", trueCheckResult);
                var checkLength = data[x].answers.len
                for (var i in data[x].answers) {
                    var value = data[x].answers[i].value;
                    var correct = data[x].answers[i].correct;
                    var arr = $('[name="exampleChecks'+x+'"]:checked').map(function(){
                        return this.value;
                    }).get();
                        
                }
                console.log("div ",trueCheckResult);
                for (const i in arr){
                    if(arr[i]== "true"){
                        sumaCheck = parseFloat(sumaCheck) + parseFloat(trueCheckResult);
                    } else if (arr[i]== "false"){
                        sumaCheckResta = parseFloat(sumaCheckResta) + parseFloat(trueCheckResult);
                    }
                }

            } else if (type == "radio"){
                var sumaRadioForx = 0;
                for (const i in data[x].answers) {
                    var value = data[x].answers[i].value;
                    var correct = data[x].answers[i].correct;
                    radioBox = $('input:radio[name=exampleRadios'+x+']:checked').val();
                }
                if (radioBox == "true"){
                    sumaRadio = parseFloat(sumaRadio) + parseFloat(valorPregunta);
                }
            }
            x++;  
            
        };//end for
        
        // suma radio
        sumaRadio2 = parseFloat(sumaRadio2) + parseFloat(sumaRadio);
        console.log("sumaRadio2: ", sumaRadio2);
        // suma Check
        sumaCheck2 = parseFloat(sumaCheck2) + parseFloat(sumaCheck);
        console.log("sumaCheck2: ", sumaCheck2);
        // suma sumaCheckResta
        sumaCheckResta2 = parseFloat(sumaCheckResta2) + parseFloat(sumaCheckResta);
        console.log("sumaCheckResta2: ", sumaCheckResta2);


        var suma = 0;
        var totalSuma = 0;
        // total del resultado
        suma = sumaRadio2 + sumaCheck2+ sumaText;
        console.log("suma: ", suma);
        totalSuma  = suma - sumaCheckResta;

        //total de preguntas:
        var total = x - 1;

        // presentación del resultado
        if (totalSuma > 6) {
            MENSAJE = "Su Calificación es de "+ totalSuma.toFixed(1) + "/10<br> Exente Trabajo...! :)";
            $("#mensaje").html(MENSAJE);
        } else {
            MENSAJE = "Su Calificación es de "+ totalSuma + "/10<br> Mejora para la siguiente ... :(";
            $("#mensaje").html(MENSAJE);
        }
        
        var resultDiv = '<input type="text" class="form-control" name="result"  value="'+totalSuma.toFixed(1)+'/10" style="display: none;">';
        var resultDate = '<input type="text" class="form-control" name="date"  value="'+fecha+' / '+ hora+'" style="display: none;">';
        
        var valueResult = "";
        valueResult = totalSuma.toFixed(1);
        var valueDate = "";
        valueDate = fecha+' / '+ hora;

        console.log("valueResult ",valueResult);
        console.log("valueDate ", valueDate);

        $("#result").val(valueResult);
        $("#date").val(valueDate);

        $("#dateResult").append(resultDate);
        $("#quizResult").append(resultDiv);

        $("#modalMensaje").modal('show');
        $("#modalQuizz").modal('hide');
        
    },
    error: function (data) {
        alert('Error');
        $("#error-500").show();
    }
    
});//end ajax
}    
