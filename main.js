const SHA256 = require('crypto-js/sha256');

class myBlock{
  constructor(index, timestamp, data, previousHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(){
    return new myBlock(0, '11/18/2018', 'Genesis block', '0');
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

}

let darrynCoin = new Blockchain();
darrynCoin.addBlock(new myBlock(1, '11/18/2018', { amount: 4}))
darrynCoin.addBlock(new myBlock(2, '11/18/2018', { amount: 10}))

console.log(JSON.stringify(darrynCoin, null, 4));
