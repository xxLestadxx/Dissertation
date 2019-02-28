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
        diplomaObject.person = createDiploma.person;
        return diploma.add(diplomaObject);
    })
    .catch(function(error){
        throw new Error (error);
    });
}

/**
 * Diploma creation, that is the certificate from the highschool
 * @param {org.ssidentity.createDrivingLicence} createDL To create the diploma
 * @transaction
 */

 function createDrivingLicence(createDL){
     var dlID = createDL.drivingLicenceID;
     var person = createDL.person;
     var diploma = createDL.diploma;
     if(person.personID === diploma.person.personID){
         return getAssetRegistry('org.ssidentity.DrivingLicence')
         .then(function(dl){
           var factory = getFactory();
           var dlObject = factory.newResource('org.ssidentity','DrivingLicence', dlID);
           dlObject.person = person;
           dlObject.diplomaStatus = 'Confirmed';  
           return dl.add(dlObject);
         })
         .catch(function(error){
             throw new Error (error);
         });
        }else{
            throw new Error('You are not the person owning this diploma');
        }
     }