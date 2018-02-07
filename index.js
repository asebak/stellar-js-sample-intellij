var request = require('request');
var StellarSdk = require('stellar-sdk');

var HORIZON_API = "https://horizon-testnet.stellar.org/";


var createAccount = function(accountId, pubkey) {
    request.get({
        url: HORIZON_API + '/friendbot',
        qs: { addr: pubkey },
        json: true
    }, function(error, response, body) {
        if (error || response.statusCode !== 200) {
            console.error('ERROR!', error || body);
        }
        else {
            console.log('SUCCESS! You have a new account :)\n', body);
        }
    });
};

var createKeys = function() {
    var pair = StellarSdk.Keypair.random();
    console.log(pair.secret());
    console.log(pair.publicKey());
    return pair;
};

var server = new StellarSdk.Server(HORIZON_API);
var pair = createKeys();
var account = createAccount(pair.xdrAccountId(), pair.publicKey());
server.loadAccount(pair.publicKey()).then(function(account) {
    console.log('Balances for account: ' + pair.publicKey());
    account.balances.forEach(function(balance) {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
    });
});