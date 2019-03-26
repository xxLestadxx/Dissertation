/**
 * 
 * Tested with Composer 0.20.2
 * 
 * Pre-Requisites
 * 1. Launch Fabric 
 * 2. Install and start the 
 * 2. Launch REST Server
 * 
 * 1. Setup the websocket library (npm install websocket --save) ... already done
 * 2. Create a websocket client object
 * 
 */
var counter=0;

 // #1 Need to use the websocket library
var WebSocketClient = require('websocket').client;

// #2 Create a WS Client
var client = new WebSocketClient();

// #3 Setup the WS connection failure listener
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());

//writing on the file, to be then executed.    
var fs = require("fs");

var data = "#!/bin/bash \n echo Hello World ";

fs.writeFile("temp.sh", data, function(err, data) {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
  
  shell.exec('./temp.sh');
});

});

// #4 Setup the on connection listener
client.on('connect', (connection)=>{
    console.log("Connected to REST-Server over WS protocol!!!");
    

    // #5 Subscribe to messages received on WS
    connection.on('message',(msg)=>{
        var event = JSON.parse(msg.utf8Data);

        // #6 Filter the events
        if(event.$class){
		    console.log("The transaction is in process");
            counter++;
            console.log('Event#', counter); 
            processEvent(event);
            var obj = JSON.stringify(event,null,5);
            holder = event.holder;
            sleep(100).then(() => {
               
                const shell = require('shelljs');                
                if(obj.includes("\"holder\": \"resource:org.ring.Trader#TA\"")){
                    var fs = require("fs");

                    var data = "#!/bin/bash \n composer transaction submit --card TB@ring -d \'{\"$class\":\"org.ring.passTheToken\",\"holder\":\""+event.holder+"\",\"token\":\""+event.token+"\"}\' ";

                    fs.writeFile("TBSubmit.sh", data, function(err, data) {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                    
                    shell.exec('./permissionForFiles.sh');
                    });
                    sleep(20).then(() => { shell.exec('./TBSubmit.sh');
                    console.log("baaaaaahta");
                    
                     });
                    console.log("da eba ko");
                    
                }else if (obj.includes("\"holder\": \"resource:org.ring.Trader#TB\"")) {
                    var fs = require("fs");

                    var data = "#!/bin/bash \n composer transaction submit --card TA@ring -d \'{\"$class\":\"org.ring.passTheToken\",\"holder\":\"resource:org.ring.Trader#TA\",\"token\":\"resource:org.ring.Token#EMA\"}\' ";

                    fs.writeFile("TASubmit.sh", data, function(err, data) {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                    
                    shell.exec('./permissionForFiles.sh');
                    });
                    sleep(20).then(() => { shell.exec('./TASubmit.sh');
                    console.log("bal sam ta pa");
                    
                     });
                    console.log("da ta shibat kalinkite");
                }
                
                console.log("finished");
            });
            
    		}else{
            console.log("Ignored event: ", event.$class);
		
        }
    })
})

// #7 Call connect with URL to the REST Server
client.connect('ws://localhost:3000');

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function  processEvent(event){
    console.log('Received event:')
    // Pretty printing the received JSON string
    console.log(JSON.stringify(event,null,2));
    
    console.log();
}

function permission(){
    const shell = require('shelljs');
    shell.exec('./permissionForFiles.sh');
}