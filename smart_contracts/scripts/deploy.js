const  deployers  = require('./deployers.js')

const urna = async () => {
    const [tse] = await ethers.getSigners()
        
    const urnaData = {
        tse: tse.address,
    }

    let contract = await deployers.urnaContract(urnaData)
    return {contract, data: urnaData}
}

module.exports = {
    urna: urna
}