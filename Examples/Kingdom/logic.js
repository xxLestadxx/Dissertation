
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
    