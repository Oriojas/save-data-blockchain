# ๐ Scaffold-ETH

> everything you need to build on Ethereum! ๐

๐งช Quickly experiment with Solidity using a frontend that adapts to your smart contract, app for save data in the blockchain, [๐ Scaffold-ETH](https://docs.scaffoldeth.io/scaffold-eth/getting-started/quick-start) beautiful project [demo](https://oriojas-lethal-monkey.surge.sh/):

![image](img_readme/img_1.png)


# ๐โโ๏ธ Quick Start

Prerequisites: [Node (v16 LTS)](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork ๐ scaffold-eth:

```bash
git clone https://github.com/scaffold-eth/scaffold-eth.git
```

> install and start your ๐ทโ Hardhat chain:

```bash
cd scaffold-eth
yarn install
yarn chain --hostname 0.0.0.0
```

> in a second terminal window, start your ๐ฑ frontend:

```bash
cd scaffold-eth
yarn start
```

> in a third terminal window, ๐ฐ deploy your contract:

```bash
cd scaffold-eth
yarn deploy
```

๐ Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`

๐ Edit your frontend `App.jsx` in `packages/react-app/src`

๐ Edit your graph `subgraph.yaml` in `packages/subgraph/subgraph.yaml` 

๐ Edit your graph query `schema.graphql` in `packages/subgraph/src/schema.graphql`

๐ Edit your graph ts `mapping.ts` in `packages/subgraph/src/mapping.ts`

๐ผ Edit your deployment scripts in `packages/hardhat/deploy`

๐ฑ Open http://localhost:3000 to see the app

# ๐ Documentation


This a small application save shipping data (for a small fee ๐ค) to the blockchain and can be consulted with [TheGraph](https://thegraph.com/en/)

## Local deploy
Used master branch in [save-data-blockchain](https://github.com/Oriojas/save-data-blockchain.git) and follow the instructions [The Graph Scaffold-eth | Docs](https://docs.scaffoldeth.io/scaffold-eth/toolkit/infrastructure/the-graph), deploy a local graph in you PC and query data save in local in the chain of HardHat (requires install [docker](https://www.docker.com/products/docker-desktop/)):

* Step 1: Clean up previous data:

```bash
yarn clean-graph-node
```

* Step 2: Spin up a local graph node by running (this may take a few minutes)

```bash
yarn run-graph-node
```

* Step 3: Create your local subgraph by running

```bash
yarn graph-create-local
```

* Step 4: Deploy your local subgraph by running

```bash
yarn graph-ship-local
```

And your graph is running:

![image](img_readme/img_2.jpg)

## Sample query

```graphql
  query MyQuery {
    pushDatas(first: 5, orderDirection: asc, orderBy: amount) {
      id
      origin
      destination
      name
      amount
      description
      status
      create
    }
  }
```  
response [graph](https://api.studio.thegraph.com/query/23301/save_data_blockchain/v0.0.10):

```graphql
{
  "data": {
    "pushDatas": [
      {
        "id": "0x5027323b073841dfb6481f2a2aff38c1f393b9fb",
        "origin": "Colombia",
        "destination": "Venezuela",
        "name": "Cafe",
        "amount": "6",
        "description": "bags",
        "status": "In transit",
        "create": "1661137750"
      }
    ]
  }
}
```

# ๐ฆ Other Flavors
- [scaffold-eth-typescript](https://github.com/scaffold-eth/scaffold-eth-typescript)
- [scaffold-eth-tailwind](https://github.com/stevenpslade/scaffold-eth-tailwind)
- [scaffold-nextjs](https://github.com/scaffold-eth/scaffold-eth/tree/scaffold-nextjs)
- [scaffold-chakra](https://github.com/scaffold-eth/scaffold-eth/tree/chakra-ui)
- [eth-hooks](https://github.com/scaffold-eth/eth-hooks)
- [eth-components](https://github.com/scaffold-eth/eth-components)
- [scaffold-eth-expo](https://github.com/scaffold-eth/scaffold-eth-expo)
- [scaffold-eth-truffle](https://github.com/trufflesuite/scaffold-eth)



# ๐ญ Learning Solidity

๐ Read the docs: https://docs.soliditylang.org

๐ Go through each topic from [solidity by example](https://solidity-by-example.org) editing `YourContract.sol` in **๐ scaffold-eth**

- [Primitive Data Types](https://solidity-by-example.org/primitives/)
- [Mappings](https://solidity-by-example.org/mapping/)
- [Structs](https://solidity-by-example.org/structs/)
- [Modifiers](https://solidity-by-example.org/function-modifier/)
- [Events](https://solidity-by-example.org/events/)
- [Inheritance](https://solidity-by-example.org/inheritance/)
- [Payable](https://solidity-by-example.org/payable/)
- [Fallback](https://solidity-by-example.org/fallback/)

๐ง Learn the [Solidity globals and units](https://docs.soliditylang.org/en/latest/units-and-global-variables.html)

# ๐? Buidl

Check out all the [active branches](https://github.com/scaffold-eth/scaffold-eth/branches/active), [open issues](https://github.com/scaffold-eth/scaffold-eth/issues), and join/fund the ๐ฐ [BuidlGuidl](https://BuidlGuidl.com)!

  
 - ๐ค  [Follow the full Ethereum Speed Run](https://medium.com/@austin_48503/%EF%B8%8Fethereum-dev-speed-run-bd72bcba6a4c)


 - ๐  [Create your first NFT](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)
 - ๐ฅฉ  [Build a staking smart contract](https://github.com/scaffold-eth/scaffold-eth/tree/challenge-1-decentralized-staking)
 - ๐ต  [Deploy a token and vendor](https://github.com/scaffold-eth/scaffold-eth/tree/challenge-2-token-vendor)
 - ๐ซ  [Extend the NFT example to make a "buyer mints" marketplace](https://github.com/scaffold-eth/scaffold-eth/tree/buyer-mints-nft)
 - ๐ฒ  [Learn about commit/reveal](https://github.com/scaffold-eth/scaffold-eth-examples/tree/commit-reveal-with-frontend)
 - โ๏ธ  [Learn how ecrecover works](https://github.com/scaffold-eth/scaffold-eth-examples/tree/signature-recover)
 - ๐ฉโ๐ฉโ๐งโ๐ง  [Build a multi-sig that uses off-chain signatures](https://github.com/scaffold-eth/scaffold-eth/tree/meta-multi-sig)
 - โณ  [Extend the multi-sig to stream ETH](https://github.com/scaffold-eth/scaffold-eth/tree/streaming-meta-multi-sig)
 - โ๏ธ  [Learn how a simple DEX works](https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90)
 - ๐ฆ  [Ape into learning!](https://github.com/scaffold-eth/scaffold-eth/tree/aave-ape)

# ๐ P.S.

๐ You need an RPC key for testnets and production deployments, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/react-app/src/constants.js` with your new key.

๐ฃ Make sure you update the `InfuraID` before you go to production. Huge thanks to [Infura](https://infura.io/) for our special account that fields 7m req/day!

# ๐๐จ Speedrun Ethereum
Register as a builder [here](https://speedrunethereum.com) and start on some of the challenges and build a portfolio.
