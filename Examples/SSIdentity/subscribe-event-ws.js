/**
 * 
 * Tested with Composer 0.20.2
 * 
 * Pre-Requisites
 * 1. Setup the websocket library (npm install websocket --save) ... already done
 * 2. Launch Fabric 
 * 3. Install and start the 
 * 4. Launch REST Server with the possibility to listen to websockets (-w true)
 * 5. Create a websocket client object
 * 
 * saved command just in case -n never = namespace never used -w true = websockets used 
 *  
 * composer-rest-server -c admin@mynetwork -n never -w true -p 3000
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
            var fs = require("fs");
            sleep(20).then(() => {
              
                const shell = require('shelljs');                
                if(event.$class === 'org.ssidentity.waitingDiplomaConfirmation'){
                    
                    var data = "#!/bin/bash \n composer transaction submit --card WH@ssidentity -d \'{\"$class\":\"org.ssidentity.confirmDiploma\",\"owner\":\""+event.owner+"\",\"diploma\":\"resource:org.ssidentity.Diploma#"+event.diploma+"\",\"hs\":\""+event.hs+"\"}\' ";

                    fs.writeFile("diplomaConfirm.sh", data, function(err, data) {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                    
                    shell.exec('./permissionForFiles.sh');
                    });
                    // the 100 ms are needed in order for the newly written file to be finished with the writing
                    sleep(100).then(() => { shell.exec('./diplomaConfirm.sh');
                     });
                }else if (event.$class === 'org.ssidentity.waitingDrivingLicenceConfirmation') {

                    var data = "#!/bin/bash \n composer transaction submit --card DS1@ssidentity -d \'{\"$class\":\"org.ssidentity.confirmDrivingLicence\",\"owner\":\""+event.owner+"\",\"ds\":\""+event.ds+"\",\"dl\":\"resource:org.ssidentity.DrivingLicence#"+event.drivingLicence+"\"}\' ";

                    fs.writeFile("confirmDrivingLicence.sh", data, function(err, data) {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                    
                    shell.exec('./permissionForFiles.sh');
                    });

                    sleep(100).then(() => { shell.exec('./confirmDrivingLicence.sh');                    
                     });
                }else if(event.$class === 'org.ssidentity.applyToUniversityEvent'){
                    var data = "#!/bin/bash \n composer transaction submit --card Stirling@ssidentity -d \'{\"$class\":\"org.ssidentity.enrollInUniversity\",\"uniDiplomaID\":\"UniDiploma"+counter+"\",\"mathGrade\":3,\"englishGrade\":3,\"csGrade\":3,\"owner\":\""+event.owner+"\",\"diploma\":\""+event.diploma+"\",\"uni\":\""+event.uni+"\"}\' ";

                    fs.writeFile("enrollInUni.sh", data, function(err, data) {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                    
                    shell.exec('./permissionForFiles.sh');
                    });
                    // the 20 ms are needed in order for the newly written file to be finished with the writing
                    sleep(100).then(() => { shell.exec('./enrollInUni.sh');
                     });
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
