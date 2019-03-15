## Business Network Card

- this is identity of a user, their credentials
- it holds the keys & certificates and the connection profile
- the user can have multiple business cards for different networks
- BNC (blokchain network card) provides all of the information that is needed to connect to a BBN (blockchain business network). You can only access a BBN through a valid BNC. A BNC contains an Identity for a single Participant within a deployed BN. BNC are used in the Hyperledger Composer Playground to connect to deployed BN.

#### Storage 
Can be stored on :
- File system 
- RAM (embeded runtime)
- database
- cloud storage

##### Network Cardstore Manager 
to get the BusinessNetworkCardStore instance - getCardStore(type)

```
const cardStore = NetworkCardStoreManager.getCardStore( walletType );
```
- Pre-defined CardStore types
```
var cardType = {type: 'composer-wallet-filesystem'}
```
AND 
``` 
var cardType = {type: 'composer-wallet-inmemory' }
```
- the default is __filesystem__


#### Reference 
1. https://www.udemy.com/hyperledger/
2. red book of IBM
3. https://hyperledger.github.io/composer/v0.19/managing/identity-bind 
4. https://hyperledger.github.io/composer/v0.19/managing/identity-issue
