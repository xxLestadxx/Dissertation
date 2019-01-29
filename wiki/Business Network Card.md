## Business Network Card

- this is identity of a user, their credentials
- it holds the keys & certificates and the connection profile
- the user can have multiple business cards for different networks

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