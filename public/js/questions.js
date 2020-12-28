$(document).ready(function(){
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
                console.log("id- ", x);
                div += '<hr><div class="form-group row">'+
                '<label class="col-sm-12 text-left">'+ statement +' </label>';
                if (type == "text"){
                    div += '<div class="col-sm-10">'+
                    '<input type="text" class="form-control" placeholder="su respuesta es..." value="" name="text'+x+'" id="text'+x+'">'+
                    '</div></div>';
                } else if (type == "check"){
                    div += '<div class="form-check col-sm-2">';
                    for (const i in data[x].answers) {
                        var value = data[x].answers[i].value;
                        var correct = data[x].answers[i].correct;
                        console.log("ds3 ", );
                        var ij = i + 1;
                        div += '<input class="form-check-input" type="checkbox" name="exampleChecks'+x+'"  value="'+ correct +'">'+
                            '<label class="form-check-label">   '+
                            + value +
                            '</label> <br>';
                    }
                    div += '</div></div>';
                    
                } else if (type == "radio"){
                    div += '<div class="form-check col-sm-2">';
                    for (const i in data[x].answers) {
                        var value = data[x].answers[i].value;
                        var correct = data[x].answers[i].correct;
                        console.log("radio ", );
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
            
            $("#quiz").append(div);

        },
        error: function (data) {
            alert('Error');
            $("#error-500").show();
        }
    });//end ajax

});

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

    var textValue = "";
    var checkBox = "";
    var radioBox = "";

    var sumaText = 0;
    var sumaCheck = 0;
    var sumaRadio = 0;
    var sumaRadio2 = 0;

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
                    console.log(texto);
                    textValue = $(texto).val();
                    console.log(textValue);
                    if (textValue == "datos"){
                        sumaText = sumaText + 1;
                        console.log("sima text: ", sumaText);
                    }
                } else if (type == "check"){
                    for (const i in data[x].answers) {
                        var value = data[x].answers[i].value;
                        var correct = data[x].answers[i].correct;
                        console.log("ds3 ", );
                        var ij = i + 1;

                    }
                    
                } else if (type == "radio"){
                    var sumaRadioForx = 0;
                    for (const i in data[x].answers) {
                        var value = data[x].answers[i].value;
                        var correct = data[x].answers[i].correct;
                        console.log("radio ", );
                        var ij = i + 1;
                        radioBox = $('input:radio[name=exampleRadios'+x+']:checked').val();
                    }
                    if (radioBox == "true"){
                        sumaRadio = sumaRadio + 1;
                    }
                }
                x++;  
                
            };//end for
            
            sumaRadio2 = sumaRadio2 + sumaRadio;
            console.log(radioBox);
            var suma = 0;
            suma = sumaCheck + sumaRadio2 + sumaText;

            //total de preguntas:
            var total = x - 1;

            // presentación del resultado
            if (suma > 2) {
                MENSAJE = "Su Calificción es de "+ suma + "/"+ total +"<br> Exente Trabajo...! :)";
                $("#mensaje").html(MENSAJE);
            } else {
                MENSAJE = "Su Calificción es de "+ suma + "/"+ total +"<br> Mejora para la siguiente ... :(";
                $("#mensaje").html(MENSAJE);
            }
            
            $("#modalMensaje").modal('show');
            $("#modalQuizz").modal('hide');
            
        },
        error: function (data) {
            alert('Error');
            $("#error-500").show();
        }
        
    });//end ajax
    
}