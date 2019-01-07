## Access Control Language 

- ACL provides Declarative access control over the elements of the domain model.
- All the rules are contained in a single file with a fixed name - permissions.acl
- everything is permitted if the file is non-existent
- rules are associated with recource
### Rule controls permission to CRUD on Resource(s)

#### Simple Rule 
Control access to namespace, asset or property of an asset by a participant type or participant instance

#### Conditional rule 
Boolean JavaScript expression ecaluated at runtime to __ALLOW__ or __DENY__ access to the resource by the participant. 

#### Rule 
- consists of __Resource__, __Participant__, __Operation__, __Transaction__ and __Condition__

- __Rule__ 
    - Specific resource class - org.acme.airline.Aircraft
    - Specific instance of class - org.acme.airline.aircraft#CRAFT01
    - All resources in Namespace - org.acme.airline*

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
