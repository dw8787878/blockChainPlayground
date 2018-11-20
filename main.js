const {Blockchain, MyBlock, minePending, Transaction} = require('./blockChain.js');

let darrynCoin = new Blockchain();

/*
console.log('Mining block 1...')
darrynCoin.addBlock(new myBlock(1, '11/18/2018', { amount: 4}))

console.log('Mining block 2...')
darrynCoin.addBlock(new myBlock(2, '11/18/2018', { amount: 10}))

console.log('Mining block 3...')
darrynCoin.addBlock(new myBlock(3, '11/19/2018', { amount: 7}))

console.log(JSON.stringify(darrynCoin, null, 4));
*/

darrynCoin.createTransaction(new Transaction('address1', 'address2', 100));
darrynCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');
darrynCoin.minePendingTransactions('egg-foo-young-address');

console.log('\nBalance of egg foo young is', darrynCoin.getBalanceOfAddress('egg-foo-young-address'));
