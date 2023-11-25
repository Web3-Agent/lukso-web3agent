# WEB3AGENT

## Getting Started

First, run the development server:
Use Node v18
```bash
npm i
npm run dev
```

### ENV Vairables
```
COINGECKO_BASE_URL=xxxxxxxxxxxxxx
INFURA_API_KEY=xxxxxxxxxxxxxx
NFT_STORAGE_API_KEY=xxxxxxxxxxxxxx
ETHEREUM_EXPLORER_API_KEY=xxxxxxxxxxxxxx
DEPLOYER_PRIVATE_KEY=xxxxxxxxxxxxxx
NEXT_PUBLIC_DEPLOYER_PRIVATE_KEY=xxxxxxxxxxxxxx
KV_REST_API_READ_ONLY_TOKEN=xxxxxxxxxxxxxx
KV_REST_API_TOKEN=xxxxxxxxxxxxxx
KV_REST_API_URL=xxxxxxxxxxxxxx
KV_URL=xxxxxxxxxxxxxx
OPENAI_API_KEY=xxxxxxxxxxxxxx
NODE_ENV=xxxxxxxxxxxxxx
JWT_SECRET=xxxxxxxxxxxxxx
NEXT_PUBLIC_NFT_STORAGE_API_KEY=xxxxxxxxxxxxxx
NEXT_PUBLIC_ALCHEMY_KEY=xxxxxxxxxxxxxx
NEXT_PUBLIC_INFURA_API_KEY=v
MONGODB_URI=xxxxxxxxxxxxxx
```


### Tableland
We have used Table to store CID of chat backup. Each user will have thier own table.
[Link](https://github.com/Web3-Agent/web3agent-arb/blob/cce7297f4ec3f252b60876f197a48015bb153213/app/manage-history/page.tsx#L25)

### Support Chain for Contract Deployment
- [Linea Goerli Testnet](https://github.com/Web3-Agent/web3agent-arb/blob/cce7297f4ec3f252b60876f197a48015bb153213/app/lib/chains.json#L17002)
- [Arbitrum Goerli](https://github.com/Web3-Agent/web3agent-arb/blob/cce7297f4ec3f252b60876f197a48015bb153213/app/lib/chains.json#L19722)
- [Scroll Sepolia Testnet](https://github.com/Web3-Agent/web3agent-arb/blob/cce7297f4ec3f252b60876f197a48015bb153213/app/lib/chains.json#L126)
- [Goerli](https://github.com/Web3-Agent/web3agent-arb/blob/cce7297f4ec3f252b60876f197a48015bb153213/app/lib/chains.json#L160)
- [Filecoin - Calibration testnet](https://github.com/Web3-Agent/web3agent-arb/blob/cce7297f4ec3f252b60876f197a48015bb153213/app/lib/chains.json#L19435)


### Contract Deployment Commands
```
write a simple contract that stores a value.
Deploy this contract on Linea Testnet
Deploy this contract on Arbitrum Goerli
Deploy this contract on Scroll Sepolia Testnet
Deploy this contract on  goerli
Deploy this contract on Filecoin - Calibration testnet

```
### Other Commands
```
1.Get Account Balance for account is __YOUR_ACCOUNT__ADDRESS__ and chain id is 1.
2.Get Transaction information, where transaction hash is __TXN_HASH__ and chain id is 1.
3.give me current block number on chain 1
4.give me gas price of chain id 1 
5.give me gas price of Ethereum.
  ```


### Screenshots:
### Decommas
We used [Decomms](https://decommas.io/) api to give user more details about portfolio and txn.
You can se commands below:

![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/commands.png)

![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/commands-screen.png)
**Portfolio**
![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/portfolio.png)
**Protocols**
![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/protocols.png)
**Search Token by Symbol**
![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/search.png)

### Tableland
##### 1. User History Configs:
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/tableland/UserHistoryConfigs.png)
##### 2. User History
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/tableland/UserHistory.png)
##### 3. Backup Option
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/tableland/BackupOption.png)

### Contract Deployment

#### Arbitrum Goerli Testnet


###### 1. Command:
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/linea/command.png)

###### 2. Deployment:
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/linea/deploy.png)

[Linea Goerli Testnet Deployed Contract Link](https://explorer.goerli.linea.build/tx/0x5006287d301df6b11cc33be0904dab9a1dda7b06fe89187054b76c380e1f11eb)

[IPFS Link](https://nftstorage.link/ipfs/bafybeic36ty4q6khdylmpd3gldkz7ftot4scas2gv77m3nly6kyiz3dobu)

#### Arbitrum Goerli Testnet

###### 1. Command:
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/arbitrum/command.png)

##### 2. Deployment:
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/arbitrum/deploy.png)

[Arbitrum Goerli Testnet Deployed Contract Link](https://testnet.arbiscan.io/tx/0x15cdb54ffd13ad89da427dbef4d513c437000749f1970901ee83aa1e036c1006)

[IPFS Link](https://nftstorage.link/ipfs/bafybeicpcmfxvpmpg2hfa4vspghtc2kdegvqp4ah3uvd7rot4v35dvkwl4)

##### Scroll

###### 1. Command:
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/scroll/command.png)

###### 2. Deployment:
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/scroll/deploy.png)


[Scroll Sepolia Testnet Deployed Contract Link](https://sepolia.scrollscan.dev/tx/0x49d1b801acca8c5a118f43c6bbc3b5beabb07c78e348acedb3b398bbe6202222)

[IPFS Link](https://nftstorage.link/ipfs/bafybeibcoutrhpnd2z342ocugzflk27bseqexek72afvgor6lozumkexge)

##### Filecoin - Calibration Testnet

###### 1. Command:
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/file/command.png)

##### 2. Deployment:
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/file/deploy.png)

[Filecoin - Calibration Testnet Deployed Contract Link](https://calibration.filfox.info/en/message/0x53cda4cf5efba9edcf10ff797a1721cb86c1608b5f6dd138d2225791a50b7280)

[IPFS Link](https://nftstorage.link/ipfs/bafybeidsrzkwr6gtfyhs3f64tuaoozf64d3uuiv2nwiaqalwynhnjibrny)

#### Ethereum Goerli Testnet

###### 1. Command:
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/goerli/command.png)

##### 2. Deployment:
  ![alt text](https://raw.githubusercontent.com/Web3-Agent/web3agent-arb/main/screenshots/goerli/deploy.png)

[Ethereum Goerli Testnet Deployed Contract Link](https://goerli.etherscan.io/tx/0x4f1b481fe8f45d2c5b3d8d6b174b286eee6be9b1c39b37ea84c27dcca5c47e94)

[IPFS Link](https://nftstorage.link/ipfs/bafybeifu7rjlzi74ugxo6te7bnpnhn2z3jzvgsb7gdqhrygzn2sc5u3ndm)
