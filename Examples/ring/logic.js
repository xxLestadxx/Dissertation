 /**
 * To graduate uni
 * @param {org.ring.passTheToken} psToken 
 * @transaction
 */

function tokenPass(psToken){
     
    return getAssetRegistry('org.ring.passTheToken')
    .then(function(graduated){
        psToken.token.number++ ;
        return graduated.update(psToken.token);
    }).then(function(event){
        var creatingOrderEvent = getFactory();
        var notificationB = creatingOrderEvent.newEvent('org.ring', 'passed');
        notificationB.token = event.token;
        emit(notificationB);
    }).catch(function(error){
        throw new Error (error);
    });
    
}


function personWantsDiploma(qdip) {
    var creatingOrderEvent = getFactory();
    var notificationB = creatingOrderEvent.newEvent('org.ssidentity', 'personWantsDiplomaEvent');
    notificationB.owner = qdip.owner;
    emit(notificationB);
 }