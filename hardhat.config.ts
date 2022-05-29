import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [{
      version: "0.8.14",
      settings: {
        viaIR: true, 
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }],
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      blockGasLimit: 300000000,
      accounts: {
        count: 20,
        accountsBalance: "100000000000000000000000000"
      }
    },
  },
  mocha: {
    timeout: 0,
    bail: true
  },
  gasReporter: {
    enabled: true,
    gasPrice: 110,
    currency: 'USD'
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  }
};

export default config;
