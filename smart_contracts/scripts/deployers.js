const { ethers } = require("hardhat");

const urnaContract = async (data) => {   
    const [deployer] = await ethers.getSigners()
    const Contract = await ethers.getContractFactory("Urna")

    const contract = await Contract.deploy(
        data.tseAddress
    )


    return contract
}

const urnaContractVerified = async (data, contractAddress) => {
    await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments:[
            data.tseAddress
        ],
    });
}


module.exports = { 
    urnaContract: urnaContract,
    urnaContractVerified: urnaContractVerified,
}

