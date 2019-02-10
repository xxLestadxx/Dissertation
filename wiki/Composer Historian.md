## Historian registry
 - Specialised registry which records successful transactions, including the participants and identities submitted them. The historian stores transactions as HistorianRecord assets, which are defined in the Hyperledger Composer system namespace. 
 - The historian registry is a Hyperledger Composer system-level entity. To refer to the historian registry as a resource for access control the historian must be referenced as: ```org.hyperledger.composer.system.HistorianRecord```
 - __Note that: All participants must have the permission to create ```HistorianRecord``` assets. If a transaction is submitted by a participant who does not have the permission to create ```HistorianRecord``` assets, the transaction will fail.__
 
#### Reference: 

1. https://hyperledger.github.io/composer/v0.19/business-network/historian