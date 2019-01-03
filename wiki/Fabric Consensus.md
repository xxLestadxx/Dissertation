## Consensus in HPL Fabric

#### Types of consensus: 

- Voting-based 
- Lottery-based  

#### Voting-based consensus 

Assuming that in business environmnet the network will operate in partial trust, voting-based consesus is advantageous in that it provids low-latency finality. When a majority of nodes validates a transaction or block, consensus exists and finality occurs. Since voting-based algorithm usually requires nodes to transfer messages to all the rest on the network, the more nodes, the more time it takes to reach consensus. This results in a trade-off between scalability and speed. 

#### Consensus in HPL Fabric : 

The consensus is broken out into 3 phases: Endorsement, Ordering and Validation. 

- __Endorsement__ is driven by policy (m out of n signatures) upon which participants endorse a transaction
- __Ordering phase__ will get the endorsed transaction and agrees to the order to be committed to the ledger. 
- __Validation__ - takes a block of ordered transactions and validates the correctness of the result.

#### Types of Consensus in Fabric

#### Byzantine Fault Tolerance 
In a blockchain network, every non-malicious entity has the same blockchain state. The implication for Hyperledger Fabric is that the orderer service should be jointly controlled by the network’s members using a BFT algorithm that resists malicious activities by bad actors. It’s insufficient for one organization to control the orderer, because that organization itself may not be trustworthy. After all, one of the motivations to use blockchain is so that organizations can cooperate while only partially trusting one another.

#### References : 
- __Kafka__ - In Kafka, only the leader does the ordering and only the in-sync replicas can be voted as leader. This provides crash fault-tolerance and finality happens in a matter of seconds. While Kafka is crash fault tolerant, it is not Byzantine fault tolerant, which prevents the system from reaching agreement in the case of malicious or faulty nodes.


https://www.skcript.com/svr/consensus-hyperledger-fabric/