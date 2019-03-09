## Tutorial what to do, how to run

When making an API POST request, __FOR TESTING PURPOSES__ - remove the transactionId and timestamp, as these two fields are self-generating. Also, always generate a transaction with time in the near future, otherwise it will have collision. 

// go to the folder where the fabric srip

export FABRIC_VERSION=hlfv12
./startFabric 

// go to the folder which contains the .bna file 

composer network install -a ./ssidentity.bna -c PeerAdmin@hlfv1

-> command succeeded

composer network star -c PeerAdmin@hlfv1 -n ssidentity -V 0.0.2-deploy.48 -A admin -S adminpw 

// usually the version is written in playground.

-> command succeded 

// usually when you've tried the same network over and over again, the composer cards you create should be refreshed to be up to date, so unless it's your first run first you have to delete the old card 

composer card delete -c admin@ssidentity

-> command succeded 

composer card import -f admin@ssidentity.card

-> command succeded

composer-rest-server // creates a rest server on localhost:3000