const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');


const provider = new HDWalletProvider(
    'smart crowd range student photo funny leave east meat promote reform problem', 
    'https://rinkeby.infura.io/v3/3140f2b37f36423e802c3a26c515ac6b'
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode, arguments: ['Hi there']}).send({gas: '1000000', from: accounts[0]});
    console.log('Contract deployed to', result.options.address);
}

deploy();