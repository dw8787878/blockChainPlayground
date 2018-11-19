const SHA256 = require('crypto-js/sha256');

class Transaction{
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}


class myBlock{
  constructor(timestamp, transaction, previousHash = ''){
    this.timestamp = timestamp;
    this.transaction = transaction;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(){
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transaction) + this.nonce).toString();
  }

  mineBlock(difficulty){
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')){
      this.nonce++;
      this.hash = this.calculateHash();
    }
    
    console.log('Block mined: ' + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransaction = [];
    this.miningReward = 100;
  }

  createGenesisBlock(){
    return new myBlock('11/18/2018', 'Genesis block', '0');
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  minePendingTransaction(miningRewardAddress){
    let block = new myBlock(Date.now(), this.pendingTransaction);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    //newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }

      if(currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

}

let darrynCoin = new Blockchain();

console.log('Mining block 1...')
darrynCoin.addBlock(new myBlock(1, '11/18/2018', { amount: 4}))

console.log('Mining block 2...')
darrynCoin.addBlock(new myBlock(2, '11/18/2018', { amount: 10}))

console.log('Mining block 3...')
darrynCoin.addBlock(new myBlock(3, '11/19/2018', { amount: 7}))

console.log(JSON.stringify(darrynCoin, null, 4));
