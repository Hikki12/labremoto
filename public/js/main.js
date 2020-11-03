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

// Buttons
var playBtn = document.getElementById("playpause");
var recordBtn = document.getElementById("record");

// 

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
				'Busy': false
				 }


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

// data = {Mode:mode,Radio: R,RPM: speedRPM,PlayState: playState,RecordState: recordState,DirState: dirState};


//
// function updateValues(){
// 	data = {Mode:mode,Radio: R,RPM: speedRPM,PlayState: playState,RecordState: recordState,DirState:dirState,Time:T};
// 	data = {
// 		   Mode:mode,
// 		   Radio: R,
// 		   RPM: speedRPM,
// 		   Steps: rpm2steps(speedRPM),
// 		   PlayState: playState,
// 		   Recording: recordState,
// 	       RecordingAvailable:false,
// 		   DirState: dirState,
// 		   RecordingTime: T,
// 		   StableSpeed:false,
// 		   Busy:false
// 		 };
	

// 	sendUpdatedValues();
// }


//
// function randomConditions(){
// 	//RANDOM SPEED RPM
// 	var min = 33; // steps
// 	var max = 140;
// 	speedRPM =  0.3*(Math.floor(Math.random() * (max - min)) + min);

// 	//RANDOM RADIO 
// 	R = Math.floor(Math.random() * 3) + 1;

// 	//RANDOM DIRECTION
// 	dirState = Math.random() >= 0.5;

// 	//RANDOM TIME 
// 	var t1 = 20;
// 	var t2 = 40;
// 	T = (Math.floor(Math.random() * (t2 - t1)) + t1);

// 	//console.log("RPM : ",speedRPM);
// 	//console.log("R : ",R);
// 	//console.log("dirState: ",dirState);
// 	//console.log("T: ",T);

// 	updateValues();		



// }


// function steps2rpm(steps){
// 	return (0.3*steps).toFixed(1)
// }

// function rpm2steps(rpm){
// 	return parseInt(rpm/0.3)
// }


// function sendUpdatedValues(){
// 	socket.emit("updates_from_js_client",data)
// }


// function reciveUpdates(data){
// 	mode = data.Mode;
// 	R = data.Radio;
// 	speedRPM = data.RPM;
// 	playState = data.PlayState;
// 	recordState = data.RecordState;
// 	dirState = data.DirState;
// 	estableSpeed = data.estableSpeed

// 	//modeSwitch.checked = !mode;
// 	//update_radio(R);

// 	//speedSlider.value = rpm2steps(speedRPM).toFixed(1);
// 	//speedLabel.innerHTML = speedRPM;

// 	playBtn.checked = !playState ;
// 	recordBtn.checked = recordState;
// 	console.log(playState,recordState,estableSpeed);

// 	if(playState == false && estableSpeed == false){
// 		msg.innerHTML = "PRESIONE INICIAR";
// 	}
// 	if(playState == true && estableSpeed == false && recordState == false){
// 		msg.innerHTML = "ESPERE...";
// 	}
// 	if(playState == true && recordState == false && estableSpeed == true){
// 		msg.innerHTML = "PRESIONE GRABAR";
// 	}
// 	if(playState == true && recordState == true && estableSpeed == true){
// 		msg.innerHTML == "GRABANDO...";
// 	}



// }




// // PLAY/PAUSE BUTTON
// playBtn.addEventListener("input",() =>{
// 	playState = !playBtn.checked
// 	console.log("Play state: ",playState);
	
// 	console.log("DATA: ",data);
	
		
// 		updateValues();
// 		if(playBtn.checked == false){
// 			msg.innerHTML = "PRESIONE INICIAR";

// 		}

// 		if(playBtn.checked == true){
// 			msg.innerHTML = "ESPERE...";
// 		}
		
	
// });

// //RECORD BUTTON 
// recordBtn.addEventListener("input",() =>{
// 	recordState = recordBtn.checked;

// 	if(recordBtn.checked == true){
// 		msg.innerHTML = "GRABANDO..."
// 	}
// 	if(recordBtn.checked == false){
// 		msg.innerHTML = "PRESIONE INICIAR";
// 	}
// 	updateValues();
// });

// //

// socket.on('connect', (s) =>{
// 	console.log('conectado xD');
	
// 	socket.emit('request_control');
// 	console.log("My ID: ",socket.id);
// 	console.log("PlayBtn :",playBtn.checked);


// });

// socket.on('updates_from_server',(data)=>{
// 	reciveUpdates(data);
// 	console.log(data);


// });


// new user is created so we generate nickname and emit event
const newUserConnected = (user) => {
  userName = user || `User${Math.floor(Math.random() * 1000000)}`;
  socket.emit("new user", userName, maquetaId);
};


const updateVariables = () => {

variables = {
				'ID': maquetaId,
				'Mode':false,
				'Radio': 1,
				'RPM': 0,
				'Steps': 0,
			    'PlayState': !playBtn.checked,
				'Recording': recordBtn.checked,
				'RecordingAvailable':false,
				'DirState': false,
				'LightState':false,
				'RecordingTime': 10,
				'Busy': false
				 }

	socket.emit(updates_to_maqueta_route,variables);
	//console.log(variables);

}

const reciveUpdates = (variables) => {
	playBtn.checked = !variables.PlayState;
	recordBtn.checked = variables.Recording;
}
	


// Buttons Events =====================================================================

playBtn.addEventListener('input',()=>{
	//console.log("PlayBtn: ", !playBtn.checked);
	updateVariables();
});

recordBtn.addEventListener('input',()=>{
	//console.log("RecordBtn: ", recordBtn.checked);
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
	console.log("solicitadas actualizaciones...");
});

// Recive video Stream
socket.on(streaming_route,(frame64)=>{
	img.src ='data:image/jpeg;base64,' + frame64;
});
