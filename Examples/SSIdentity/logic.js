/**
 * Script logic file for the Selfsovereign identity use case
 * It has 4 participants - person, high school, university, driving school
 * The use case will show how the person can only provide the needed data without exposing needlessly more 
 */


/**
 * Diploma creation, that is the certificate from the highschool
 * @param {org.ssidentity.createDiploma} createDiploma To create the diploma
 * @transaction
 */
function createDiploma(createDiploma){
    var diplomaID = createDiploma.diplomaID;
       return getAssetRegistry('org.ssidentity.Diploma')
        .then(function(diploma){
        var diplomaFactory = getFactory();	 
        var diplomaObject = diplomaFactory.newResource('org.ssidentity','Diploma', diplomaID);       	  
        diplomaObject.mathGrade = createDiploma.mathGrade;
        diplomaObject.englishGrade = createDiploma.englishGrade;
        diplomaObject.csGrade = createDiploma.csGrade;
        diplomaObject.hs = createDiploma.hs;
        diplomaObject.owner = createDiploma.owner;
        return diploma.add(diplomaObject);
    })
    .catch(function(error){
        throw new Error (error);
    });
}

/**
 * Driving lessons starting creation, that is the certificate from the highschool
 * @param {org.ssidentity.createDrivingLicence} createDL
 * @transaction
 */

 function createDrivingLicence(createDL){
    var dlID = createDL.drivingLicenceID;
    var owner = createDL.owner;
    var diploma = createDL.diploma;
    if(owner.personID === diploma.owner.personID){
         if(owner.age >= 18){
             
         return getAssetRegistry('org.ssidentity.DrivingLicence')
         .then(function(dl){
           var factory = getFactory();
           var dlObject = factory.newResource('org.ssidentity','DrivingLicence', dlID);
           dlObject.owner = owner;
           dlObject.diplomaStatus = 'Confirmed';  
           return dl.add(dlObject);
         })
         .catch(function(error){
             throw new Error (error);
         });
        }else{
            throw new Error('You are underage');
        }
    }else{
        throw new Error ('You are not the person owning this diploma');
    }
}

/**
 * Diploma creation, that is the certificate from the highschool
 * @param {org.ssidentity.enrollInUniversity} enrollUni 
 * @transaction
 */
 function enrollInUniversity(enrollUni){
     var uniDiplomaID = enrollUni.uniDiplomaID;
     var mathGrade = enrollUni.mathGrade;
     var englishGrade = enrollUni.englishGrade;
     var csGrade = enrollUni.csGrade;
     if(enrollUni.owner.personID === enrollUni.diploma.owner.personID){
        if((enrollUni.diploma.mathGrade >= mathGrade) &&
            (enrollUni.diploma.englishGrade >= englishGrade) &&
            (enrollUni.diploma.csGrade >= csGrade)){
                return getAssetRegistry('org.ssidentity.UniversityDiploma')
                .then(function(uniDip){
                  var factory = getFactory();
                  var uniDipObject = factory.newResource('org.ssidentity','UniversityDiploma', uniDiplomaID);
                  uniDipObject.status = 'Enrolled';
                  uniDipObject.owner = enrollUni.owner;
                  uniDipObject.uni = enrollUni.uni; 
                  return uniDip.add(uniDipObject);
                })
                .catch(function(error){
                    throw new Error (error);
                });

            }else{
                throw new Error ('Your grades are not good enough. Try again next year')
            }
     }else{
         throw new Error ('Not the correct owner of the diploma');
     }
     
 }

 /**
 * To graduate uni
 * @param {org.ssidentity.graduateUni} grad 
 * @transaction
 */

 function graduateUniversity(grad){
     if(grad.uniDiploma.owner.personID === grad.owner.personID){
        if(grad.uniDiploma.uni.universityID === grad.uni.universityID){
            return getAssetRegistry('org.ssidentity.UniversityDiploma')
            .then(function(graduated){
                grad.uniDiploma.status = 'Graduated';
                grad.uniDiploma.finalGrade = 76;
                return graduated.update(grad.uniDiploma);
            })
        }else{
            throw new Error ('You have not graduated from this university');
        }
     }else{
         throw new Error ('This is not the person that graduated');
     }
 }
 
  /**
 * emit event with all entries of the select diploma query
 * @param {org.ssidentity.personWantsDiploma} qdip 
 * @transaction
 */

function personWantsDiploma(qdip) {
    var creatingOrderEvent = getFactory();
    var notificationB = creatingOrderEvent.newEvent('org.ssidentity', 'personWantsDiplomaEvent');
    notificationB.owner = qdip.owner;
    emit(notificationB);
 }