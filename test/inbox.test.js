const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider(); //new instance of Web3 and connect to ganache network. 
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();


    //deployment of contract

    inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({data: bytecode, arguments: ['Hi there!']}).send({from: accounts[0], gas: '1000000'});
    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async() => {
        const message = await inbox.methods.message().call(); //property?
        assert.equal(message, 'Hi there!');

    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Hello world').send({ from: accounts[0] }); //this is because data is being modified.
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hello world');

    });
});


//test case is called car almost like a comment