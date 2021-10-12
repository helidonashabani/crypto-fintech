'use strict';

const LOCK_UNTIL_BLOCK = 150; // pick a block height above the current tip

const bitcore = require('bitcore-lib'); // bitcore-lib should be in the same folder as the js file

bitcore.Networks.defaultNetwork = bitcore.Networks.testnet;

var privateKey = new bitcore.PrivateKey();
var publicKey = privateKey.toAddress();

var scriptPubKey = new bitcore.Script()
  .add(bitcore.crypto.BN.fromNumber(LOCK_UNTIL_BLOCK).toScriptNumBuffer())
  .add(bitcore.Opcode.OP_CHECKLOCKTIMEVERIFY)
  .add(bitcore.Opcode.OP_DROP)
  .add(bitcore.Opcode.OP_DUP)
  .add(bitcore.Opcode.OP_HASH160)
  .add(bitcore.Script.buildPublicKeyHashOut(publicKey))
  .add(bitcore.Opcode.OP_EQUALVERIFY).add(bitcore.Opcode.OP_CHECKSIG);


var address = bitcore.Address.payingTo(scriptPubKey);

var utxo = {
  txid: "ea20e154fdf6f3ab4b1e16c0a2b638d87028c66822113395169241312cdce501", // tran id 
  vout: 0, // output index of the utxo 
  scriptPubKey: "00141149fd1966ae60c2345df6f85a758617a00cbe42", // scriptPubKey of the utxo 
  satoshis: 1000000000, // value of the utxo txid[vout]
};

var freezeTrans = new bitcore.Transaction().from(utxo)
.to(address,1000000000)
.sign(privateKey);


const getSpendTransaction = function(lockTime, sequenceNo) {

  var utxo_trans = {
    txid: freezeTrans.id,
    vout: 0,
    scriptPubKey: scriptPubKey.toScriptHashOut(),
    satoshis: 1000000000,
  };
  
  var transaction = new bitcore.Transaction().from(utxo_trans)
  .to(privateKey.toAddress(), 1000000000 - 300000000) // send back to the first Addr
  .lockUntilBlockHeight(lockTime);

  transaction.inputs[0].sequenceNumber = sequenceNo;

  var signature = bitcore.Transaction.sighash.sign(
    transaction,
    privateKey,
    bitcore.crypto.Signature.SIGHASH_ALL,
    0,
    scriptPubKey
  );


  transaction.inputs[0].setScript(
    bitcore.Script.empty()
    .add(signature.toTxFormat())
    .add(privateKey.toPublicKey().toBuffer())
    .add(scriptPubKey.toBuffer())
  );

  return transaction;
};


var spendTransaction = getSpendTransaction(LOCK_UNTIL_BLOCK, 0);


var brokenSpendTransaction = getSpendTransaction(LOCK_UNTIL_BLOCK, 0xffffffff); //Infinit sequence number

var result = {
  fromAddress: privateKey.toAddress().toString(),
  p2shAddress: address.toString(),
  redeemScript: scriptPubKey.toString(),
  freezeTransaction: {
    txid: freezeTrans.id,
    raw: freezeTrans.serialize(true),
  },
  spendTransaction: {
    txid: spendTransaction.id,
    raw: spendTransaction.serialize(true),
  },
  brokenSpendTransaction: {
    txid: brokenSpendTransaction.id,
    raw: brokenSpendTransaction.serialize(true),
  },
};

console.log(JSON.stringify(result, null, 2));


