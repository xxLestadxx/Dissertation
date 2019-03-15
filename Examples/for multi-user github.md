export COMPOSER_PROVIDERS='{"github":{"provider":"github","module":"passport-github","clientID":"4f51d324bc65a0006aaf","clientSecret":"413ed09bae53b1eb40894c356b6dbbe8c9ce86df","authPath":"/auth/github","callbackURL":"/auth/github/callback","successRedirect":"/","failureRedirect":"/"}}'


curl -v http://localhost:3000/api/system/ping?access_token=xxxxx

curl -v -H 'X-Access-Token: xxxxx' http://localhost:3000/api/system/ping

daka:<password>@cluster0-imfeb.mongodb.net/test?retryWrites=true
