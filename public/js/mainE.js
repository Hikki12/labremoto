const socket = io.connect();

let userName = "";
let maquetaId = "MAQUETA-MCU";

// SocketIO routes
const streaming_route = "stream video";
const updates_to_web_route = "updates to web";
const updates_to_maqueta_route = "updates to maqueta";
const request_updates_route = "request updates"


// Video Element for update frames
var img = document.getElementById("video");

// Buttons ====================================================================

var dirBtn = document.getElementById("clockwiseBtn");
var lightBtn = document.getElementById("lightBtn");

var r1Btn = document.getElementById("r1Btn");
var r2Btn = document.getElementById("r2Btn");
var r3Btn = document.getElementById("r3Btn");

var playBtn = document.getElementById("playBtn");
var recordBtn = document.getElementById("recordBtn");

var speedSlider = document.getElementById("speedSlider");
var speedLabel = document.getElementById("sliderLabelValue");


var timeInput = document.getElementById("timeInput");
var msg = document.getElementById("msg")


// VARIABLES ================================================================================ 

// var msg = document.getElementById("msg");
// var label1 = document.getElementById("L1");
// //Variables
// var mode = false;

// var R = 1;
// var speedRPM = 0;

// var playState = false;
// var recordState = false;
// var dirState = false;
// var estableSpeed = false;

// recordBtn.disabled = false;

// //tiempo de grabación
// var T = 20;

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

// FUNCTIONS ===========================================================================


function randomConditions(){
	//RANDOM SPEED RPM
	var min = 33; // steps
	var max = 140;
	speedRPM =  0.3*(Math.floor(Math.random() * (max - min)) + min);

	//RANDOM RADIO 
	R = Math.floor(Math.random() * 3) + 1;

	//RANDOM DIRECTION
	dirState = Math.random() >= 0.5;

	//RANDOM TIME 
	var t1 = 20;
	var t2 = 40;
	T = (Math.floor(Math.random() * (t2 - t1)) + t1);

	//console.log("RPM : ",speedRPM);
	//console.log("R : ",R);
	//console.log("dirState: ",dirState);
	//console.log("T: ",T);

	updateValues();		



}

// new user is created so we generate nickname and emit event
const newUserConnected = (user) => {
  userName = user || `User${Math.floor(Math.random() * 1000000)}`;
  socket.emit("new user", userName, maquetaId);
};


const updateVariables = () => {
variables = {
				'ID': maquetaId,
				'Mode':false,
				'Radio': radio,
				'RPM': 0.3*(speedSlider.value),
				'Steps': parseInt(speedSlider.value),
			    'PlayState': !playBtn.checked,
				'Recording': recordBtn.checked,
				'RecordingAvailable':!recordBtn.checked,
				'DirState': !dirBtn.checked,
				'LightState':lightBtn.checked,
				'RecordingTime': timeInput.value,
				'Busy': socket.connected
				 }

	socket.emit(updates_to_maqueta_route,variables);
	console.log(variables);

}

const reciveUpdates = (variables) => {
	playBtn.checked = !Boolean(variables.PlayState);
	recordBtn.checked = Boolean(variables.Recording);
	lightBtn.checked = Boolean(variables.LightState);

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
	recordBtn.disabled = !Boolean(variables.RecordingAvailable)

	if(playBtn.checked===false && recordBtn.checked==false){
		msg.innerHTML = "PRESIONE INICIAR";
	}


}
	


// BUTTONS EVENTS =====================================================================


lightBtn.addEventListener('input',()=>{
	updateVariables();
})

playBtn.addEventListener('input',()=>{
	updateVariables();
});

recordBtn.addEventListener('input',()=>{
	if(recordBtn.checked){
		recordBtn.disabled = true;
	}
	updateVariables();
});


// SocketIO Events =====================================================================
socket.on('connect',(s)=>{
	newUserConnected();
})

// Recive Updates
socket.on(updates_to_web_route,(data)=>{
	reciveUpdates(data)
});

socket.on(request_updates_route,()=>{
	updateVariables();
});

// Recive video Stream
socket.on(streaming_route,(frame64)=>{
	img.src ='data:image/jpeg;base64,' + frame64;
});
