#!/bin/bash

composer card import -f PeerAdmin@byfn-network-org1.card --card PeerAdmin@byfn-network-org1

composer card import -f PeerAdmin@byfn-network-org2.card --card PeerAdmin@byfn-network-org2

composer network install --card PeerAdmin@byfn-network-org1 --archiveFile ssidentity.bna

composer network install --card PeerAdmin@byfn-network-org2 --archiveFile ssidentity.bna
 
composer identity request -c PeerAdmin@byfn-network-org1 -u admin -s adminpw -d alice

composer identity request -c PeerAdmin@byfn-network-org2 -u admin -s adminpw -d bob

composer network start -c PeerAdmin@byfn-network-org1 -n ssidentity -V 0.0.2-deploy.144 -o endorsementPolicyFile=/tmp/composer/endorsement-policy.json -A alice -C alice/admin-pub.pem -A bob -C bob/admin-pub.pem

composer card create -p /tmp/composer/org1/byfn-network-org1.json -u alice -n ssidentity -c alice/admin-pub.pem -k alice/admin-priv.pem

composer card import -f alice@ssidentity.card

composer network ping -c alice@ssidentity

composer participant add -c alice@ssidentity -d '{"$class":"org.ssidentity.Person","personID":"Daka","firstName":"Yordan","lastName": "Gospodinov","phone":"4324325","email":"daka.gospodinov@stirling.co","gender":"Male","age":23 }'

composer identity issue -u Daka -a org.ssidentity.Person#Daka -c alice@ssidentity -x

composer card import -f Daka@ssidentity.card

composer network ping -c Daka@ssidentity

composer network list -c Daka@ssidentity

composer participant add -c alice@ssidentity -d '{"$class":"org.ssidentity.HighSchool","highSchoolID":"WH","highschoolName":"Wallace High","email": "WallaceHigh@stirling.co","phone":"324323245","rating":100}'

composer identity issue -u WH -a org.ssidentity.HighSchool#WH -c alice@ssidentity -x

composer card import -f WH@ssidentity.card

composer network ping -c WH@ssidentity

#composer transaction submit --card TA@ssidentity -d '{"$class": "org.hyperledger.composer.system.AddAsset", "targetRegistry" : "resource:org.hyperledger.composer.system.AssetRegistry#org.ssidentity.Token", "resources": [{"$class": "org.ssidentity.Token","tokenKey":"EMA", "number":"0","holder":"resource:org.ssidentity.Trader#TA" }]}'

composer network list -c WH@ssidentity

composer card create -p /tmp/composer/org2/byfn-network-org2.json -u bob -n ssidentity -c bob/admin-pub.pem -k bob/admin-priv.pem

composer card import -f bob@ssidentity.card

composer network ping -c bob@ssidentity

composer participant add -c bob@ssidentity -d '{"$class":"org.ssidentity.DrivingSchool","drivingSchoolID":"DS1","drivingSchoolName":"DriveWithUs","rating":100}'

composer identity issue -u DS1 -a org.ssidentity.DrivingSchool#DS1 -c bob@ssidentity -x

composer card import -f DS1@ssidentity.card

composer network ping -c DS1@ssidentity


#composer transaction submit --card TB@ssidentity -d '{"$class":"org.ssidentity.passTheToken","holder":"resource:org.ssidentity.Trader#TA","token":"resource:org.ssidentity.Token#EMA"}'


composer network list -c DS1@ssidentity


composer participant add -c bob@ssidentity -d '{"$class":"org.ssidentity.University","universityID":"Stirling","universityName":"University of Stirling","email":"stir.co","phone":"23215324","rating":100}'

composer identity issue -u Stirling -a org.ssidentity.University#Stirling -c bob@ssidentity -x

composer card import -f Stirling@ssidentity.card

composer network ping -c Stirling@ssidentity

composer network list -c Stirling@ssidentity
