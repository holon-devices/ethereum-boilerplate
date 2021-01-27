//do not use require('./contracts/Inbox.sol'); --bad! because JS will not run contract

const path = require('path'); //cross-platform compability with path module
const fs = require('fs'); 
const solc = require('solc');
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); //indicates path to inbox.sol

const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox']; //number of difference contracts we're attempting to compile which is one

//just the bytecode property and ABI. 
