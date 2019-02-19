/**
 * New script file
 */

 /**
  * Health insurance provider need to Approve insurance request 
  * @param {org.syngxchain.approveInsurance} request
  * @transaction
  */

  function approveInsuranceReq (request){
      var requestor = request.owner;
      var insurLedger = request.insuranceDetails;
      var apporver = insurLedger.owner;
      if(requestor.HSI === apporver.HSI){
          return getAssetRegistry('org.syngxchain.Insuranceledger')
          .then(function(insurL){
              insurLedger.status = 'Approved';
              return insurL.update(insurLedger);
          })
          .then(function(){
              return getParticipantRegistry('org.syngxchain.HealthInsuranceCompany');
          })
          .then(function(InsComp){
              apporver.AccountBalance = approver.AccountBalance + insurLedger.SubscriptionCharge;
              return InsComp.update(apporver);
          })
          .then(function(){
              return getParticipantRegistry('org.syngxchain.Patient');
          })
          .then(function(patientUpdate){
              insurLedger.subscriber.accountBalance = insurLedger.subscriber.accountBalance - insurLedger.SubscriptionCharge;
              return patientUpdate.update(insurLedger.subscriber);
          })
          .catch(function(error){
              // Add optional error handling here
              throw new Error (error);
          });
      }else{
          throw new Error ('You are not valid approver');
      }
  }
  