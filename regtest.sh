
#!/bin/bash -x
# usage: ./regtest.sh

# set these variables for your environment’s specific configuration
REGTEST_DIR=~/.bitcoin;
BITCOIN_D=~/Bitcoin/bitcoin-0.20.1/bin/bitcoind;

BITCOIN_CLI=~/Bitcoin/bitcoin-0.20.1/bin/bitcoin-cli;
NODEJS=nodejs;

# setup a fresh regtest environment for this test
/bin/rm -rf $REGTEST_DIR;
/bin/mkdir -p $REGTEST_DIR;

# configure the new regtest environment
$BITCOIN_D -regtest -fallbackfee=0.0002 -debug=rpc -datadir=$REGTEST_DIR

