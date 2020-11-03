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

// FUNCTIONS ===========================================================================

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
	dirBtn.checked = !Boolean(variables.DirState);

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

}
	


// BUTTONS EVENTS =====================================================================

dirBtn.addEventListener('input',()=>{
	updateVariables();
})

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

r1Btn.addEventListener('input',()=>{
	radio = 1;
	updateVariables();
});

r2Btn.addEventListener('input',()=>{
	radio = 2;
	updateVariables();
});

r3Btn.addEventListener('input',()=>{
	radio = 3;
	updateVariables();
});


speedSlider.addEventListener('input', ()=>{
	speedLabel.innerHTML = (0.3*speedSlider.value).toFixed(1);
});

speedSlider.addEventListener('change', ()=>{
	updateVariables();
});

timeInput.addEventListener('input',()=>{
	updateVariables();
})

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
