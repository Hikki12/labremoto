function Timer(callback, delay) {
    var timerId, remaining = delay;

    this.pause = function() {
        window.clearInterval(timerId);
    };

    this.resume = function() {
        window.clearInterval(timerId);
        timerId = window.setInterval(callback, remaining);
    };

    this.resume();
}



const socket = io.connect();
let userName = "";
let maquetaId = "MAQUETA-MCU";
let response = false;

// SocketIO routes
const streaming_route = "stream video";
const identify_route = "identify maqueta";
const connection_user_route = "new user";
const updates_to_web_route = "updates to web";
const updates_to_maqueta_route = "updates to maqueta";
const request_updates_route = "request updates";
const stream_control = "stream control";
const quiz_route = "quiz route";
const response_route_maqueta = "response to maqueta";
const response_route_web = "response to web";

// Video Element for update frames
var img = document.getElementById("video");

// Buttons ====================================================================
var downloadBtn = document.getElementById("downloadBtn");


var dirBtn = document.getElementById("clockwiseBtn");
var lightBtn = document.getElementById("lightBtn");

var r1Btn = document.getElementById("r1Btn");
var r2Btn = document.getElementById("r2Btn");
var r3Btn = document.getElementById("r3Btn");

var playBtn = document.getElementById("playBtn");
playBtn.checked = true;
var recordBtn = document.getElementById("recordBtn");

var playLabel = document.getElementById("playLabel");
var recordLabel = document.getElementById("recordLabel");

var speedSlider = document.getElementById("speedSlider");
var speedLabel = document.getElementById("sliderLabelValue");

var msg = document.getElementById("msg")

var timeInput = document.getElementById("timeInput");
// VARIABLES ================================================================================ 

var radio = 1;
var variables = {
				'ID': maquetaId,
				'Mode':false,
				'Radio': 1,
				'RPM': 0,
				'Steps': 0,
			    'PlayState': false,
				'Recording': false,
				'RecordingAvailable':false,
				'DirState': false,
				'LightState':false,
				'RecordingTime': 10,
				'Busy': true
				 }

var backup = JSON.parse(JSON.stringify(variables));
// FUNCTIONS ===========================================================================

// new user is created so we generate nickname and emit event
const newUserConnected = (user) => {
  userName = user || `User${Math.floor(Math.random() * 1000000)}`;
  socket.emit("new user", userName, maquetaId);
  console.log(userName, maquetaId);
};

const dataBackup = ()=>{
	backup = JSON.parse(JSON.stringify(variables));
} 

const restoreBackup = ()=>{
	variables = JSON.parse(JSON.stringify(backup));
} 
//

const lockControls = ()=>{
	playBtn.disabled = true;
	recordBtn.disabled = true;
	r1Btn.disabled = true;
	r2Btn.disabled = true;
	r3Btn.disabled = true;
	speedSlider.disabled = true;
	dirBtn.disabled = true;
	timeInput.disabled = true;
}

const unlockControls = ()=>{
	playBtn.disabled = false;
	recordBtn.disabled = false;
	r1Btn.disabled = false;
	r2Btn.disabled = false;
	r3Btn.disabled = false;
	speedSlider.disabled = false;
	dirBtn.disabled = false;
	timeInput.disabled = false;
	unlock = true;
}

///

var check_count = 0;
var unlock = true;
const checkResponse = function() {

	if(response){
		console.log("Respuesta ok");
		timer.pause();
		unlockControls();
		return 
	}
	else{
		check_count++;
		console.log(check_count);
		if(check_count>=4){
			restoreBackup();
			reciveUpdates(variables);
			if(unlock){
				unlockControls();
			}
			
			check_count = 0
			timer.pause();			
		}
		return
	}
}

var timer = new Timer(checkResponse, 250);
timer.pause();



const updateVariables = () => {
	//console.log(variables);
	dataBackup();
	lockControls();
	socket.emit(updates_to_maqueta_route, variables);
	timer.resume();
}

const reciveUpdates = (data) => {
	variables = JSON.parse(JSON.stringify(data));
	//console.log("Received: ", variables);
	playBtn.checked = !Boolean(variables.PlayState);
	recordBtn.checked = Boolean(variables.Recording);
	lightBtn.checked = Boolean(variables.LightState);
	dirBtn.checked = Boolean(variables.DirState);

	//Radio
	if(variables.Radio === 1){
		r1Btn.checked = true;
	}
	if(variables.Radio === 2){
		r2Btn.checked = true;
	}
	if(variables.Radio === 3){
		r3Btn.checked = true;
	}	

	//slider
	speedSlider.value = parseInt(variables.Steps);
	speedLabel.innerHTML = (0.3*speedSlider.value).toFixed(1);
	
	// if(!recordBtn.checked){
	// 	downloadFiles();
	// }

}
	


// BUTTONS EVENTS =====================================================================

dirBtn.addEventListener('input',()=>{
	variables["DirState"] = !Boolean(dirBtn.checked);
	updateVariables();
})

lightBtn.addEventListener('input',()=>{
	variables["LightState"] = Boolean(lightBtn.checked);
	updateVariables();
})

playBtn.addEventListener('input',()=>{
	if(!playBtn.checked){
		msg.innerHTML = "PRESIONER GRABAR";
		playLabel.innerHTML = "DETENER";
	}else{
		playLabel.innerHTML = "INICIAR";
	}
	variables["PlayState"] = !Boolean(playBtn.checked);
	updateVariables();
});

recordBtn.addEventListener('input',()=>{
	console.log("Record: ", recordBtn.checked);
	if(playBtn.checked){
		recordBtn.checked = false;
		msg.innerHTML = "PRESIONE INICIAR";
	}
	variables["Recording"] = Boolean(recordBtn.checked);
	
	if(recordBtn.checked){
		console.log("Grabando...");
		msg.innerHTML = "GRABANDO...";
		unlock = false;
		lockControls();
		setTimeout(unlockControls, 1000*variables["RecordingTime"]);
	}else{
		playBtn.checked = true;
		msg.innerHTML = "PRESIONE INICIAR";
	}
	updateVariables();
	
});

r1Btn.addEventListener('input',()=>{
	radio = 1;
	variables["Radio"] = radio;
	updateVariables();
});

r2Btn.addEventListener('input',()=>{
	radio = 2;
	variables["Radio"] = radio;
	updateVariables();
});

r3Btn.addEventListener('input',()=>{
	radio = 3;
	variables["Radio"] = radio;
	updateVariables();
});


speedSlider.addEventListener('input', ()=>{
	speedLabel.innerHTML = (0.3*speedSlider.value).toFixed(1);
});

speedSlider.addEventListener('change', ()=>{
	variables["Steps"] = parseInt(speedSlider.value);
	variables["RPM"] = (0.3*speedSlider.value).toFixed(1);
	updateVariables();
});

timeInput.addEventListener('input',()=>{
	variables["RecordingTime"] = parseInt(timeInput.value);
	updateVariables();
})

// DOWNLOAD EVENTS =======================

// downloadBtn.addEventListener('click', ()=>{
// console.log("Solicitar Descarga")
// });


// SocketIO Events =====================================================================

socket.on('connect',(s)=>{
	console.log("Conectado...");
	newUserConnected();
	socket.emit(request_updates_route);
})

// Recive Updates
socket.on(updates_to_web_route, (data)=>{
	reciveUpdates(data);
	socket.emit(response_route_maqueta);
	console.log("Responding...");

});

socket.on(request_updates_route, ()=>{
	updateVariables();
	console.log("Solicitudes ");
});

//recive response
socket.on(response_route_web, ()=>{
	response = true;
	console.log("Maqueta responsed!");
});

// Recive video Stream
socket.on(streaming_route, (frame64)=>{
	img.src ='data:image/jpeg;base64,' + frame64;
});
