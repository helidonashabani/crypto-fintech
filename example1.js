'use strict';
const LOCK_UNTIL_BLOCK = 150; 
const bitcore = require('bitcore-lib');
bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;
var privateKey = new bitcore.PrivateKey();
var address = privateKey.toAddress();
console.log(privateKey);
console.log(address);

