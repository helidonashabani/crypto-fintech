#PATH
BITCOIN_CLI=~/Bitcoin/bitcoin-0.20.1/bin/bitcoin-cli

#Generate the new addresses
Address_A=$($BITCOIN_CLI -regtest getnewaddress)
echo $Address_A

Address_B=$($BITCOIN_CLI -regtest getnewaddress)
echo $Address_B

#First generate 50 blocks to address A
Genereatedblocks_A=$($BITCOIN_CLI -regtest generatetoaddress 50 $Address_A)


#Mine 100 blocks whose rewards go to A
Mine_A_blocks=$($BITCOIN_CLI -regtest generatetoaddress 100 $Address_A)


#Send 10 BTCs from A to B
SEND_10_BTS=10
Mine_B_blocks=$($BITCOIN_CLI -regtest sendtoaddress $Address_B $SEND_10_BTS)


#import accounts
#$($BITCOIN_CLI -regtest importaddress $Address_A $Address_A false)
#$($BITCOIN_CLI -regtest importaddress $Address_B $Address_B false)


UNSPENT=$($BITCOIN_CLI -regtest listunspent 6 9999 [\"$Address_A\"])

UNSPENT_FIRST_TRANS=$(echo $UNSPENT | python3 -c 'import json,sys;obj=json.loads(sys.stdin.read());print(obj[0]);');
echo "First Transaction:"
echo $UNSPENT_FIRST_TRANS;

echo "Txid:"
echo $UNSPENT | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['txid'])"

echo "Vout:"
echo $UNSPENT | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['vout'])"

echo "ScriptPubKey:"
echo $UNSPENT | python3 -c "import sys, json; print(json.load(sys.stdin)[0]['scriptPubKey'])"

#UNSPENT1=$($BITCOIN_CLI -regtest listunspent 6 9999 [\"$Address_B\"])
#echo $UNSPENT1

