#!/bin/bash

composer network install -a ./ring.bna -c PeerAdmin@hlfv1

composer network start -c PeerAdmin@hlfv1 -n ring -V 0.0.2-deploy.8  -A admin -S adminpw

composer card delete -c admin@ring

composer card import -f admin@ring.card

composer participant add -d '{"$class":"org.ring.TraderA","participantA":"TA"}' -c admin@ring

composer identity issue -u TA -a org.ring.TraderA#TA -c admin@ring -x

composer participant add -d '{"$class":"org.ring.TraderB","participantB":"TB"}' -c admin@ring

composer identity issue -u TB -a org.ring.TraderB#TB -c admin@ring -x

composer card delete -c TA@ring

#composer card import -f TA@ring.card

composer card delete -c TB@ring

#composer card import -f TB@ring.card

	
# Setup the Environment variables for the REST Server

#1. Set up the card to be used
export COMPOSER_CARD=admin@ring

#2. Set up the namespace usage    always |  never
export COMPOSER_NAMESPACES=never

#3. Set up the REST server Authhentcation    true | false
export COMPOSER_AUTHENTICATION=true

# This script sets up the environment property for 
# Mongo DB loopback connector. This property is used
# by REST server for connecting with the MongoDB 
# instance in the cloud | local

#1. Set up the REST server to multi user mode    true | false
export COMPOSER_MULTIUSER=true

# PLEASE CHANGE THIS TO point to your DB instance
# ================================================
# HOST = DB Server host,   PORT = Server port#
# database = Name of the database
# Credentials =>    user/password 
# connector   =>    We are using mongodb, it can be 
#                   any nosql database

export COMPOSER_DATASOURCES='{
    "db": {
        "name": "db",
        
        "url": "mongodb://test: test @cluster0-shard-00-00-imfeb.mongodb.net:27017,cluster0-shard-00-01-imfeb.mongodb.net:27017,cluster0-shard-00-02-imfeb.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
        "port": 27017,
       
        "database": "restauth",

        "connector": "mongodb"  
    }
}'

#4. Set up the Passport strategy provider
export COMPOSER_PROVIDERS='{
  "github": {
    "provider": "github",
    "module": "passport-github",
    "clientID": "4f51d324bc65a0006aaf",
    "clientSecret": "413ed09bae53b1eb40894c356b6dbbe8c9ce86df",
    "authPath": "/auth/github",
    "callbackURL": "/auth/github/callback",
    "successRedirect": "/",
    "failureRedirect": "/"
  }
}'

#5. Execute the REST server
composer-rest-server
