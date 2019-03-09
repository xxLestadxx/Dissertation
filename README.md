# Dissertation

To do:
---
- Focus on development 
    - a participant entry for every unique participant
    - adding an asset
    - adding and playing with ACL and Queries
- 5 to 10 tests that the system should pass 
    - showing interaction 
    - showing how good or how bad is the system
    0 adding a test case to show the limitation of the system
    - showing negative results is good - at least you know what not to do. 
- User manual for how to install the system and how to use it - to be as a chapter. 

---
- documentation of the process of creation of Self-sovereign identity system 
- manual of Hyperledger Fabric, it will be in the wiki Page of this github repo // under wiki folder
---

- make sure that the person is giving his ID and it's not taken by somebody just like that. 
- certify with public key and see the private one ? (can it be done in Fabric and how)
- ID -> encripty -> authority -> decript -> ID
- __proper trust model__
    - who is certifying which info (Resources/Participants ACL)
    - who can see the info (Query and ACL)
- who is holding what and what cross checks are possible
- global picture of identity system
- Am I my public key only or I will be able to do more things in the system (add a participant, enter as the participant in the network)
- can somebody impersonate me by other means than stealing my ID
- procedure  for solving conflicts with the data 
- Public/private key on top of the system ? yes, no why ?
- Let a participant to enter only if it's being approved by the admin or being approved by the majority of the people 
- __MODEL OF TRUST__ - what defines my identity and how it is achieved. 
- how the public key and the participant are connected.
- verifying that the person has the document 
--- 
- running a script for the REST API ? 
---


Done: 

✔ Interim report

✔ Creation of a system based on a "kingdom model" with free and slaved people

✔ Query for personID - when using the REST for id you have to provide the full "name" - ex: resource:org.example.trading.Trader#exampleTraderID

✔ who is using which info (Resources/Participants ACL) - created ACL - rules for what kind of resource can be used by a participant 