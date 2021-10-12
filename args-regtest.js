const argparse = require('argparse');

const parser = new argparse.ArgumentParser({
add_help: true,
});

parser.add_argument('--txid', {
required: true,
help: 'transaction id of an unspent output',
});

parser.add_argument('--vout', {
required: true,
help: 'vout of an unspent output',
});

parser.add_argument('--scriptPubKey', {
required: true,
help: 'scriptPubKey of an unspent output',
});

parser.add_argument('--satoshis', {
required: true,
help: 'value of an unspent output (given in satoshis)',
});


module.exports = parser.parse_args();
