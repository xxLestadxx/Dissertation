## Access Control Language 

- ACL provides Declarative access control over the elements of the domain model.
- __The rules are consecutively executed. Which means that if the first rule is to grant permission to everyone to do everything, no matter what rules follow, all participants will be grant full permissions.__ 
- All the rules are contained in a single file with a fixed name - permissions.acl
- everything is permitted if the file is non-existent
- rules are associated with recource
- Has an action - Allow or Deny.
### Rule controls permission to CRUD on Resource(s)

#### Simple Rule 
Control access to namespace, asset or property of an asset by a participant type or participant instance

#### Conditional rule 
Boolean JavaScript expression ecaluated at runtime to __ALLOW__ or __DENY__ access to the resource by the participant. 

#### Rule 
- consists of __Resource__, __Participant__, __Operation__, __Transaction__ and __Condition__

- __Resource__ 
    - Specific resource class - org.acme.airline.Aircraft
    - Specific instance of class - org.acme.airline.aircraft#CRAFT01
    - All resources in Namespace - org.acme.airline* or org.acme.airline** (recursive)
- __Participant__ - A rule may be specific to a participant type, keyword __ANY__ used if participant check is not required 
    - System - org.hyperledger.composer.system.NetworkAdmin
    - App level - depending on the application there could be different type of roles, aka. B2BPartners, Personnel etc. Or you can apply it to all of them. 
- __Operation__ - a rule decides which Operations 
    - CRUD - provide comma (,) separated list of ops (CREATE, READ ...)
    - ALL - keyword for all operations
- __Transaction__ - providing permissioned access to the transactions is helpful for : 
    - business logic cannot be by-passed 
    - data stays consistent 
    - Prevents unauthorized changes
- __Condition__ - a valid JS conditional expression may be specified and evaluated at runtime.
    - Symbolic access to the execution context 
        - Resource = r 
        - Operation = op
        - Participant = p 
        - Transaction = tx
    ```
    participant (p): "org.example.SampleParticipant"
    resource(r):"org.example.SampleAsset"
    condition:( r.owner.getIdentifier() == p.getIdentifier() )
    ```
    - Complex conditions are supported - Utility function(s) in script file
    ```
    participant(p):" org.example.SampleParticipant "
    resource(r):"org.example.SampleAsset"
    condition: evaluateAccess(r,p)
    ```
    
#### How to : 
```
rule NameOfTheRule { 
    description : "provide description in quotes"
    resource: "Fully qualified resource specification"
    participant: "Fully qualified participant specification " 
    operation: ALL *or* Comma separated CRUD
    action: ALLOW *or* DENY

    } 
``` 
