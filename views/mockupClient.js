
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


class MockupClient {
	constructor(address){
		this.socket = io(address);
	}

	reciveVideo(){
		console.log("recive video");
	}

	reciveUpdates(){
		console.log("recive update")
	}

	close(){
		console.log("Close");
	}


}

const client = new MockupClient();
export default client;