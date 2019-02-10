/**
 * request for buy 
 * @param {org.onlinegrocery.model.BuyGroc} reqGrocery-is grocery which buyer requested for buy
 * @transaction
 */
function requestForBuy(reqGrocery){
	var grocery = reqGrocery.reqGrocery;
  	var buyer = reqGrocery.reqbuyer;
  	var seller = reqGrocery.reqGrocery.Seller;
  if(reqGrocery.reqGrocery.Buyer === undefined){
  	console.log('Buyer is', reqGrocery.reqGrocery.Buyer);
    if(buyer.balances > grocery.price){
    return getAssetRegistry('org.onlinegrocery.model.grocery')
      .then(function(groceryUpdate){
      grocery.Buyer = buyer;
      return groceryUpdate.update(grocery);
    })
      .then(function(){
      return getParticipantRegistry('org.onlinegrocery.model.buyer')
    })
      .then(function(buyerUpdate){
      buyer.balances=buyer.balances - grocery.price;
      return buyerUpdate.update(buyer);
    })
      .then(function(){
      return getParticipantRegistry('org.onlinegrocery.model.seller')
    })
      .then(function(sellerUpdate){
      seller.balances=seller.balances + grocery.price;
    })
      .catch(function(error){
      throw new Error(error);
    });
    }else{
      throw new Error('you dont have sufficient balance');
    }
  }else{
    throw new Error('item is already sold');
  }
}

