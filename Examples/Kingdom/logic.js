
/**
* Increases the quantity of the comodity 
* @param { org.kingdom.person.socialScoreIncrease } SCIncrease - the qI to be increased 
* @transaction
*/
async function socialScoreIncrease(SCIncrease){
    SCIncrease.IDCard.socialScore = SCIncrease.IDCard.socialScore + 1;
      let assetRegistry = await getAssetRegistry('org.kingdom.person.identificationCard');
      await assetRegistry.update(SCIncrease.IDCard);
    }
/**
* Increases the quantity of the comodity 
* @param { org.kingdom.person.statusChange } statusChange - the status changed to Free person for now 
* @transaction
*/
async function statusChange(statusChange){
    if(statusChange.free.status === "Free"){
      statusChange.slave.status = "Free"
      let assetRegistry = await getAssetRegistry('org.kingdom.person.identificationCard');
      await assetRegistry.update(statusChange.slave);
    }
}

