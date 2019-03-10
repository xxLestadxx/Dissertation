## Queries

#### ACL 
 The queries are going to give results to the participant invoking them based on his permissions. If the queries are getting result from several assets, the participant is going to get information only about the assets he has permission to see. 

#### Named Queries 
- Defined as part of the Business Network model
- Exposed as REST API by _composer-rest-server_ component.

- _BusinessNetworkConnection_ .query(named, parameters_object)

#### Dynamic Queries
- Constructed dynamically a.k.a at runtime 
- Composer API in _Transaction processor_ function | Client code

- _BusinessNetworkConnection_ .buildQuery(query_statement)
- _BusinessNetworkConnection_ .query(queryReturned, parameters_object)

#### Reference : 

1. Blockchain development on Hyperledger Fabric using Composer, udemy, by Raj
2. https://ibm-blockchain.github.io/develop/business-network/query