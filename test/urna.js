const { expect } = require('chai')
const deploy = require("../scripts/deploy.js")
const { ethers } = require('hardhat')
const { HARDHAT_MEMPOOL_SUPPORTED_ORDERS } = require("hardhat/internal/constants");


let urna

describe('Urna Contract', function(){
    it('testUrnaDeploy', async function(){
        urna = await deploy.urna()
    })
})