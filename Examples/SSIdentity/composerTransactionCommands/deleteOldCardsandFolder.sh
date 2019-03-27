#!/bin/bash

export FABRIC_VERSION=hlfv11

#./byfn.sh -m -up -s couchdb -a

composer card delete -c PeerAdmin@byfn-network-org1
composer card delete -c PeerAdmin@byfn-network-org2
composer card delete -c alice@trade-network
composer card delete -c bob@trade-network
composer card delete -c admin@trade-network
composer card delete -c PeerAdmin@fabric-network
composer card delete -c jdoe@trade-network
composer card delete -c dlowe@trade-network
composer card delete -c alice@ring
composer card delete -c bob@ring
composer card delete -c TA@ring
composer card delete -c TB@ring
composer card delete -c alice@ssidentity
composer card delete -c bob@ssidentity
composer card delete -c Daka@ssidentity
composer card delete -c WH@ssidentity
composer card delete -c DS1@ssidentity
composer card delete -c Stirling@ssidentity

rm -fr /tmp/composer

mkdir -p /tmp/composer/org1

mkdir -p /tmp/composer/org2

#certificates
#awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt > /tmp/composer/org1/ca-org1.txt

#awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt > /tmp/composer/org2/ca-org2.txt

#awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/tls/ca.crt > /tmp/composer/ca-orderer.txt

#create the connection profiles

#export ORG1=crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp

#cp -p $ORG1/signcerts/A*.pem /tmp/composer/org1

#cp -p $ORG1/keystore/*_sk /tmp/composer/org1


#export ORG2=crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp

#cp -p $ORG2/signcerts/A*.pem /tmp/composer/org2

#cp -p $ORG2/keystore/*_sk /tmp/composer/org2

#composer card create -p /tmp/composer/org1/byfn-network-org1.json -u PeerAdmin -c /tmp/composer/org1/Admin@org1.example.com-cert.pem -k /tmp/composer/org1/*_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@byfn-network-org1.card

#composer card create -p /tmp/composer/org2/byfn-network-org2.json -u PeerAdmin -c /tmp/composer/org2/Admin@org2.example.com-cert.pem -k /tmp/composer/org2/*_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@byfn-network-org2.card

#put the endorsement policy in the composer folder
