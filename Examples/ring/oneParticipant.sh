#!/bin/bash

composer network install -a ./ring.bna -c PeerAdmin@hlfv1

composer network start -c PeerAdmin@hlfv1 -n ring -V 0.0.2-deploy.10  -A admin -S adminpw

composer card delete -c admin@ring

composer card import -f admin@ring.card

composer participant add -d '{"$class":"org.ring.TraderA","participantA":"TA"}' -c admin@ring

composer identity issue -u TA -a org.ring.TraderA#TA -c admin@ring -x

composer participant add -d '{"$class":"org.ring.TraderB","participantB":"TB"}' -c admin@ring

composer identity issue -u TB -a org.ring.TraderB#TB -c admin@ring -x

composer card delete -c TA@ring

composer card import -f TA@ring.card

composer card delete -c TB@ring

composer card import -f TB@ring.card
	
# Setup the Environment variables for the REST Server

#1. Set up the card to be used
export COMPOSER_CARD=admin@ring

#2. Set up the namespace usage    always |  never
export COMPOSER_NAMESPACES=never

export COMPOSER_WEBSOCKETS=true
#5. Execute the REST server
composer-rest-server
