## The Ledger in Hyperledger Fabric
### Consists of two distinct, though related, parts - __world state__ and a __blockchain__

#### World state
The world state is a database that holds the __current values__ of a set of ledger states.  Ledger states are, by default, expressed as __key-value__ pairs, though there is some flexability in this regard. The world state changes frequently, as states can be created, updated and deleted.  

Those states represent the states of the assets in the current network.

The world state is created because it's useful for programs to get the current value of the asset, instead of traversing the entire blockchain to calculate the current value of that asset.

Physically, the world state is implemented as a database. DBs provide a rich set of operations for the efficient storage and retrieval of states. Fabric can be configured to use different world state DBs to address the needs of different types of state values and the access patterns required by applications, for example in complex queries. Usually Fabric will use LevelDB or CouchDB(for more complex networks).

Obviously only validated transactions will be able to change the world state.

![WSDiagram](ledgerdiagram3.png)
_The visual vocabulary expressed in facts is as follows: There is a ledger state with key=CAR1 and value=Audi. There is a ledger state with key=CAR2 and a more complex value {model:BMW, color=red, owner=Jane}. Both states are at version 0._


 The version number of a state is incremented every time the state changes. It's a good way to check whether the state of the asset has been updated in order to make sure it matches with the version when the transaction was created. This check ensures that the world state changing __from the same expected value to the same expected value__ as when the transaction was created.

When a ledger first is created the world state is empty. Since the transactions are recorded in the blockchain and any valid transaction  can change the world state, this means that the world state can be re-generated from the blockchain at any time. This can be very convenient - for example, the world state is automatically generated when a peer is created. Moreover, if a peer fails abnormally, the world state can be regenerated on peer restart, before transactions are accepted. 

#### Blockchain 
The blockchain is with it's defining qualities - immutable sequense of blocks, each of which contains a set of ordered transactions. 

The blockchain here is represented as a transaction log that records all the changes that determine the world state. Transactions are collected inside blocks that are appendeed to the blockchain - enabling you to understand the history of changes that resulted in the current world state. 

![Ledger](ledger.diagram.1.png)
_The visual vocabulary expressed in facts is as follows: Ledger L comprises blockchain B and World State W. Blockchain B determines World State W. Also expressed as: World state W is derived from blockchain B._

The network maintains multiple copies of the ledger - which are kept consistent with every other copy through a process called consensus. 

The blockchain is a transaction log, structured as interlinked blocks, where each block contains a sequence of transactions each of which represents a query or update to the wolrd state. The exact mechanism of how the peers are validating and then the orderer orders the valid transactions is disscussed in the peers section. It is important that block sequencing, as well as transaction sequencing within blocks, is established when blocks are first created.

Each block's header includes a hash of the block's transactions, as well as a copy of the hash of the prior block's header. In this way, all transactions on the ledger are sequenced and cryptographically linked together. This hashing and linking makes the ledger data very secure. Even if one node hosting the ledger has tamperede with, it would not be able to convince all the other nodes that it has the 'correct' blockchain because the ledger is distributed throughout a network of independent nodes. 

Physically, the blockchain is always implemented as a file, in contrast to the world state, which uses a DB. This is a sensible design choice as the blockchain data structrure is heavily biased towards a very small set of operations. Appending to the end of the blockchain is the primary operation, and query is currently a relatively infrequent operation. 

![FabricBlockchain](ledgerdiagram2.png)

_The visual vocabulary expressed in facts is as follows: Blockchain B contains blocks B0, B1, B2, B3. B0 is the first block in the blockchain, the genesis block_

In the above diagram, we can see that block B2 has a block data D2 which contains all its transactions: T5, T6, T7.

Most importantly, B2 has a block header H2, which contains a cryptographic hash of all the transactions in D2 as well as with the equivalent hash from the previous block B1. In this way, blocks are inextricably and immutably linked to each other, which the term blockchain so neatly captures!

Finally, as you can see in the diagram, the first block in the blockchain is called the genesis block. It’s the starting point for the ledger, though it does not contain any user transactions. Instead, it contains a configuration transaction containing the initial state of the network channel. We discuss the genesis block in more detail when we discuss the blockchain network and channels in the documentation.

#### References : 
1. https://hyperledger-fabric.readthedocs.io/en/release-1.3/ledger/ledger.html