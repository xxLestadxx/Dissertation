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
  

  /**
   * Patient need to request insurance provider to get health insurance
   * @param {org.syngxchain.requestInsurance} request
   * @transaction
   */

   function requestInsurance(request){
       var owner = request.owner;
       var subscriber = request.subscriber;
       var subscriptionPlan = request.subscriptionPlan;
       var Coverage ; 
       var status = 'Pending';
       var Validity = '1 year';
       var SubscriptionCharge;
       if(subscriptionPlan === 'Silver'){
            SubscriptionCharge = 1000.89;
            Coverage = 5000;
       }else if(subscriptionPlan === 'Gold'){
            SubscriptionCharge = 1500.89;
            Coverage = 7000;
       }else if(subscriptionPlan === 'Diamond'){
            SubscriptionCharge = 2000.89;
            Coverage = 10000;
       }else{ 
            SubscriptionCharge = 2500.89;
            Coverage = 20000;
       }

       var insuranceID = owner.HSI + subscriber.PMI ;
       var patientBal = subscriber.accountBalance;
       if (patientBal > SubscriptionCharge){
           return getAssetRegistry('org.syngxchain.Insuranceledger')
           .then(function(insurL){
               var insurF = getFactory();
               var insurObject = insurF.newResource('org.syngxchain', 'Insuranceledger', insuranceID);
               insurObject.owner = owner;
               insurObject.subscriber = subscriber;
               insurObject.subscriptionPlan = subscriptionPlan;
               insurObject.Coverage = Coverage;
               insurObject.Validity = Validity;
               insurObject.SubscriptionCharge = SubscriptionCharge;
               insurObject.status = status;
               return insurL.add(insurObject);
           })
           .catch(function(error){
               //Add optional error handling here

               throw new Error (error);
           });
       }else {
           throw new Error ('you do not have sufficient balance');
       }
    }

    /**
     * Paying Consultation Bill
     * @param {org.syngxchain.PayConsultationBillFHI} rbill
     * @transaction
     */

     function payConsultation(rbill){
         var a = 5; 
         var bill = rbill.bill;
         var requestor = bill.payer;
         if(requestor.HSI === bill.payer.HSI){
             return getAssetRegistry('org.syngxchain.InsuranceBilltoDoct')
             .then(function(InsurBillUpdate){
                 bill.status = 'Paid';
                 return InsurBillUpdate.update(bill);
             })
             .then(function(){
                 return getParticipantRegistry('org.syngxchain.HealthInsuranceCompany');
             })
             .then(function(HealthInsuranceUpdate){
                 requestor.DueBalance = requestor. DueBalance - bill.rx.consultingCharges;
                 requestor.AccountBalance = requestor.AccountBalance + bill.rx.consultingCharges;
                 return HealthInsuranceUpdate.update(requestor);
             })
             .then(function(){
                 return getParticipantRegistry('org.syngxchain.Physician');
             })
             .then(function(DoctorUpdate){
                 var rxDoc = bill.receiver;
                 rxDoc.accountBalance = rxDoc.accountBalance + bill.rx.consultingCharges;
                 return DoctorUpdate.update(rxDoc);
             })
             .catch(function(error){
                 //Add optional error handling here
                 throw new Error (error);
             });
         }else{
             throw new Error ('You are not the correct payer');
         }
     }

/**
 * Paying bill
 * @param {org.syngxchain.payRecipeBill} bill
 * @transaction
 */

 function PayBill(bill){
     var requestPayer = bill.payer;
     var requestRecipeBill = bill.bill;
     var recipe = requestRecipeBill.recipe;
     var doctor = recipe.physician;
     if(requestRecipeBill.status === 'Pending'){
         if(recipe.patient.PMI === requestPayer.PMI){
            if(requestPayer.accountBalance > recipe.consultingCharges){
                return getAssetRegistry('org.syngxchain.RecipeBill')
                .then(function(updateBill){
                    requestRecipeBill.status = 'Paid';
                    return updateBill.update(requestRecipeBill);
                })
                .then(function(){
                    return getParticipantRegistry('org.syngxchain.Patient');
                })
                .then(function(updatePatient){
                    requestPayer.accountBalance = requestPayer.accountBalance - requestPayer.DueBalance;
                    requestPayer.DueBalance = requestPayer.DueBalance - recipe.consultingCharges;
                    return updatePatient.update(requestPayer);
                })
                .then(function(){
                    return getParticipantRegistry('org.syngxchain.Physician');
                })
                .then(function(updateDoctor){
                    doctor.accountBalance = doctor.accountBalance + recipe.consultingCharges;
                    return updateDoctor.update(doctor);
                })
                .then(function(){ 
                    //Maybe this is wrong /page 155
                    var PayingBillEvent = getFactory();
                    var notificationB = PayingBillEvent.newEvent('org.syngxchain', 'PayingBill');
                    notificationB.bill = requestRecipeBill;
                    notificationB.payer = requestRecipeBill;
                    notificationB.receiver = doctor;
                    emit(notificationB);
                })
                .catch(function(error){
                    throw new Error (error);
                });

            }else{
                throw new Error ('You dont have sufficient balanace');
            }
         }else{
             throw new Error ('you are not the payer');
         }
     }else{
         throw new Error ('This Bill is already paid');
     }
 }

 /**
  * Physicians need to create Recipe which will create recipe bill
  * @param {org.syngxchain.createRecipe} recipeDetails
  * @transaction
  */

  function CreateRecipeNbill(recipeDetails){
      var contID = recipeDetails.contractID;
      var patient = recipeDetails.patient;
      var doctor = recipeDetails.physician;
      var appointment = recipeDetails.appointment;
      var checkupList = recipeDetails.PatientCheckupList;
      var rxdate = recipeDetails.prescriptionDate;
      var tablets = recipeDetails.tablets;
      var dosage = recipeDetails.dosage;
      var product = recipeDetails.type;
      var notes = recipeDetails.notes;
      var consltCharge = recipeDetails.consultingCharges;
      var insurFlag = appointment.InsuranceFlag;
      if(insurFlag === 'Yes'){
          var insuranceCompany = appointment.insuranceID.owner;
          if(doctor.NPI === appointment.confirmedBy.NPI){
              if(patient.PMI === appointment.patient.PMI){
                  return getAssetRegistry('org.syngxchain.Recipe')
                  .then(function(AssetRecipe){
                      var factory = getFactory();
                      var recipeObject = factory.newResource('org.syngxchain', 'Recipe', contID);
                      recipeObject.patient = patient;
                      recipeObject.physician = doctor;
                      recipeObject.appointment = appointment;
                      recipeObject.PatientCheckupList = checkupList;
                      recipeObject.prescriptionDate = rxdate;
                      recipeObject.dosage = dosage;
                      recipeObject.tablets = tablets;
                      recipeObject.type = product;
                      recipeObject.notes = notes;
                      recipeObject.consultingCharges = consltCharge;
                      return AssetRecipe.add(recipeObject);
                  })
                  .then(function(){
                      return getAssetRegistry('org.syngxchain.InsuranceBilltoDoct');
                  })
                  .then(function(recipeBill){
                      var recipeFactory = getFactory();
                      var recipeObject = recipeFactory.newResource('org.syngxchain', 'Recipe', contID);
                      recipeObject.patient = patient;
                      recipeObject.physician = doctor;
                      recipeObject.appointment = appointment;
                      recipeObject.PatientCheckupList = checkupList;
                      recipeObject.prescriptionDate = rxdate;
                      recipeObject.dosage = dosage;
                      recipeObject.tablets = tablets;
                      recipeObject.type = product;
                      recipeObject.notes = notes;
                      recipeObject.consultingCharges = consltCharge;
                      var factory = getFactory();
                      var billObject = factory.newResource('org.syngxchain', 'InsuranceBilltoDoct', contID);
                      billObject.payer = insuranceCompany;
                      billObject.rx = recipeObject;
                      billObject.reffInsuranceLedger = appointment.insuranceID;
                      billObject.receiver = doctor;
                      billObject.status = 'Pending';
                      return recipeBill.add(billObject);
                  })
                  .then(function(){
                      return getParticipantRegistry('org.syngxchain.HealthInsuranceCompany');
                  })
                  .then(function(InsuranceUpdate){
                    insuranceCompany.DueBalance = consltCharge;
                    return InsuranceUpdate.update(insuranceCompany);
                  })
                  .catch(function(error){
                      throw new Error (error);
                  });
              }else{
                  throw new Error ('Select proper patient');
              }
          }else{
              throw new Error ('Appointment for this recipe was not created by you');
          }
      }else {
          if(doctor.NPI === appointment.confirmedBy.NPI){
              if(patient.PMI === appointment.patient.PMI){
                  return getAssetRegistry('org.syngxchain.Recipe')
                  .then(function(AssetRecipe){
                      var factory = getFactory();
                      var recipeObject = factory.newResource('org.syngxchain', 'Recipe', contID);
                      recipeObject.patient = patient;
                      recipeObject.physician = doctor;
                      recipeObject.appointment = appointment;
                      recipeObject.PatientCheckupList = checkupList;
                      recipeObject.prescriptionDate = rxdate;
                      recipeObject.dosage = dosage;
                      recipeObject.tablets = tablets;
                      recipeObject.type = product;
                      recipeObject.notes = notes;
                      recipeObject.consultingCharges = consltCharge;
                      return AssetRecipe.add(recipeObject);
                  })
                  .then(function(){
                      return getAssetRegistry('org.syngxchain.RecipeBill');
                  })
                  .then(function(recipeBill){
                      var recipeFactory = getFactory();
                      var recipeObject = recipeFactory.newResource('org.syngxchain', 'Recipe', contID);
                      recipeObject.patient = patient;
                      recipeObject.physician = doctor;
                      recipeObject.appointment = appointment;
                      recipeObject.PatientCheckupList = checkupList;
                      recipeObject.prescriptionDate = rxdate;
                      recipeObject.dosage = dosage;
                      recipeObject.tablets = tablets;
                      recipeObject.type = product;
                      recipeObject.notes = notes;
                      recipeObject.consultingCharges = consltCharge;
                      var factory = getFactory();
                      var billObject = factory.newResource('org.syngxchain', 'RecipeBill', contID);
                      billObject.payer = patient;
                      billObject.recipe = recipeObject;
                      billObject.receiver = doctor;
                      billObject.status = 'Pending';
                      return recipeBill.add(billObject);
                      // It is like this in the book /p 161
                      var RecipementEvent = getFactory();
                      var notification = RecipementEvent.newEvent('org.syngxchain', 'RecipeCreation');
                      notification.recipe = recipeObject;
                      notification.doctor = doctor;
                      emit(notification);
                      var RecipeBillEvent = getFactory();
                      var notificationB = RecipementEvent.newEvent('org.syngxchain','RecipeBillCreation');
                      notificationB.bill = billObject;
                      emit(notificationB)
                  })
                  .then(function(){
                      return getParticipantRegistry('org.syngxchain.Patient');
                  })
                  .then(function(patientUpdate){
                      patient.DueBalance = consltCharge;
                      return patientUpdate.update(patient);
                  })
                  .catch(function(error){
                      throw new Error (error);
                  });
              }else{
                  throw new Error ('Select proper patient');
              }
          }else{
              throw new Error ('Appointment for this recipe was not created by you');
          }
      }
  }


  /**
   * Physicians need to confirm appointment 
   * @param {org.syngxchain.confirmAppointment} confirmation
   * @transaction
   */

   function ConfirmAppointment(confirmation){
       var requestDoctor = confirmation.doctor;
       var requestAppoint = confirmation.appoint;
       console.log('sudip', confirmation.appoint.diseaseType);
       var diseasegroup = confirmation.appoint.diseaseType;
       var insuranceFlag = confirmation.appoint.InsuranceFlag;
       var doctorSpecialist = requestDoctor.Specialization;
       if (insuranceFlag === 'Yes'){
           var insurancedet = confirmation.appoint.insuranceID;
           var insurPatientID = insurancedet.subscriber.PMI;
           var reqPatient = confirmation.appoint.patient.PMI;
           var insuranceStatus = insurancedet.status;
           if(insurPatientID === reqPatient && insuranceStatus === 'Approved'){
               if(diseasegroup === doctorSpecialist){
                   if(requestAppoint.status === 'Pending'){
                       return getAssetRegistry('org.syngxchain.Appointment')
                       .then(function(appoint){
                           requestAppoint.status = 'Confirmed';
                           requestAppoint.confirmedBy = requestDoctor;
                           return appoint.update(Appoint);
                           var appointmentEvent = getFactory();
                           var notification = appointmentEvent.newEvent('org.syngxchain','AppointmentConfirmation');
                           notification.appointment = requestAppoint;
                           notification.patient = requestAppoint.patient;
                           notification.doctor = requestDoctor;
                           emit(notification);
                       })
                       .catch(function(error){
                           throw new Error(error);
                       });
                   }else{
                       throw new Error ('Appointment is already Confirmed')
                   }
               }else{
                   throw new Error ('Your specialization does not match with Patient disease type');
               }
           }else{
               throw new Error ('Patient Dont have valid insurance');
           }
       }else{
           if(diseasegroup === doctorSpecialist){
               if(requestAppoint.status === 'Pending'){
                   return getAssetRegistry('org.syngxchain.Appointment')
                   .then(function(appoint){
                        requestAppoint.status = 'Confirmed';
                        requestAppoint.confirmedBy = requestDoctor;
                        return appoint.update(requestAppoint);
                        var appointmentEvent = getFactory();
                        var notification = appointmentEvent.newEvent('org.syngxchain','AppointmentConfirmation');
                        notification.appointment = requestAppoint;
                        notification.patient = requestAppoint.patient;
                        notification.doctor = requestDoctor;
                        emit(notification);
                   })
                   .catch(function(error){
                       throw new Error (error);
                   });
               }else{
                   throw new Error('Appointment is already Confirmed')
               }
           }else{
               throw new Error ('Your specialization does not match with Patient disease type');
           }
       }
   }

/**
 * Pharmacy need to confirm the order and update the order 
 * @param {org.syngxchain.ShipmentReceived} order
 * @transaction
 */

 