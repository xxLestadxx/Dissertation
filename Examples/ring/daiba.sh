#!/bin/bash

composer transaction submit --card alice@trade-network -d '{"$class": "org.hyperledger.composer.system.AddAsset", "targetRegistry" : "resource:org.hyperledger.composer.system.AssetRegistry#org.example.trading.Commodity", "resources": [{"$class": "org.example.trading.Commodity","tradingSymbol":"DATAEBAVGYZA", "description":"Corn commodity","mainExchange":"EURONEXT", "quantity":"10","owner":"resource:org.example.trading.Trader#trader1-org1"}]}'
