require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers")
require("@openzeppelin/hardhat-upgrades")
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */

const {PRIVATE_KEY, API_KEY} = process.env

module.exports = {
  networks:{
    hardhat:{

    },
    PolygonAmoy: {
      url: "https://rpc.ankr.com/polygon_amoy",
      accounts: [PRIVATE_KEY]
    },
    PolygonMainnet:{
      url: "https://polygon.rpc.subquery.network/public",
      accounts: [PRIVATE_KEY]
    },
    ImmutableTestnet:{
      url: "https://rpc.testnet.immutable.com",
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: API_KEY
  },
  sourcify: {
    enabled: true
  },
  solidity: "0.8.27",
};
