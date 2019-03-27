/**
 * Script logic file for the Selfsovereign identity use case
 * It has 4 participants - person, high school, university, driving school
 * The use case will show how the person can only provide the needed data without exposing needlessly more 
 * Based on Bulgarian system. 
 */


/**
 * Diploma creation, that is the certificate from the highschool
 * The creator is the Person participant (student), later, the asset has to be 
 * updated to status Confirmed by the respective highschool
 * @param {org.ssidentity.createDiploma} createDiploma To create the diploma
 * @transaction
 */
function createDiploma(createDiploma){
    var diplomaID = createDiploma.diplomaID;
       return getAssetRegistry('org.ssidentity.Diploma')
        .then(function(dipl){
        var diplomaFactory = getFactory();	 
        var diplomaObject = diplomaFactory.newResource('org.ssidentity','Diploma', diplomaID);       	  
        diplomaObject.mathGrade = createDiploma.mathGrade;
        diplomaObject.englishGrade = createDiploma.englishGrade;
        diplomaObject.csGrade = createDiploma.csGrade;
        diplomaObject.diplomaStatus = 'Pending';
        diplomaObject.hs = createDiploma.hs;
        diplomaObject.owner = createDiploma.owner;
        return dipl.add(diplomaObject);
        }).then(function(){
        var creatingOrderEvent = getFactory();
        var notificationB = creatingOrderEvent.newEvent('org.ssidentity', 'waitingDiplomaConfirmation');
        notificationB.owner = createDiploma.owner;
        notificationB.hs = createDiploma.hs;
        notificationB.diploma = createDiploma.diplomaID;
        emit(notificationB);  
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
    var drivingSchool = createDL.ds;
    if(owner.personID === diploma.owner.personID){
         if(owner.age >= 18){
             if(diploma.diplomaStatus === 'Confirmed'){       
                    return getAssetRegistry('org.ssidentity.DrivingLicence')
                    .then(function(dl){
                    var factory = getFactory();
                    var dlObject = factory.newResource('org.ssidentity','DrivingLicence', dlID);
                    dlObject.owner = owner;
                    dlObject.ds = drivingSchool;
                    dlObject.diplomaStatus = 'Confirmed';
                    dlObject.dsStatus = 'Pending';
                    return dl.add(dlObject);
                    })
                    .then(function(){
                    var creatingOrderEvent = getFactory();
                    var notificationB = creatingOrderEvent.newEvent('org.ssidentity', 'waitingDrivingLicenceConfirmation');
                    notificationB.owner = createDL.owner;
                    notificationB.ds = drivingSchool;
                    notificationB.drivingLicence = dlID;
                    emit(notificationB);  
                    })
                    .catch(function(error){
                        throw new Error (error);
                    });
                }else{
                    throw new Error('User does not have confirmed diploma');
                }
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
                  uniDipObject.uniStatus = 'Enrolled';
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
 * @param {org.ssidentity.confirmDiploma} cd 
 * @transaction
 */

 function confirmDip(cd){
 if(cd.diploma.owner.personID === cd.owner.personID){
    return getAssetRegistry('org.ssidentity.Diploma')
             .then(function(confirm){
                cd.diploma.diplomaStatus = 'Confirmed';
                return confirm.update(cd.diploma);
                }).catch(function(error){
                    throw new Error (error);
                });
    }else{
        throw new Error ('This is not the person that graduated');
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
                grad.uniDiploma.uniStatus = 'Graduated';
                grad.uniDiploma.finalGrade = 76;
                return graduated.update(grad.uniDiploma);
            }).catch(function(error){
                throw new Error (error);
            });
        }else{
            throw new Error ('You have not graduated from this university');
        }
     }else{
         throw new Error ('This is not the person that graduated');
     }
 }
 
 /**
 * To graduate uni
 * @param {org.ssidentity.confirmDrivingLicence} cdl 
 * @transaction
 */

function confirmDrivingLicence(cdl){
    if(cdl.dl.owner.personID === cdl.owner.personID){
       return getAssetRegistry('org.ssidentity.DrivingLicence')
                .then(function(confirm){
                   cdl.dsStatus = 'Confirmed';
                   return confirm.update(cdl.dl);
                }).catch(function(error){
                       throw new Error (error);
                   });
        }else{
            throw new Error ('This is not the person that graduated');
        }
    }