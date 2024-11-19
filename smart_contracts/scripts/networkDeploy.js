const deployers = require('./deployers.js')


const urnaData = {
    tseAddress: "0x54ac2BFb0927b373f24dbc7cEc958a40E0F21684"
}

const main = async () =>{
    const [deployer] = await ethers.getSigners()

    //deploy urna
    //const Urna = await deployers.urnaContract(urnaData)
    //console.log(Urna.target) //VOLTA CONTRACT-ADDRESS

    //verificar blockexplorer
    await deployers.urnaContractVerified(urnaData, "0x82Ea504469f2A0283DaC1F97Cc5181Db8c614928")
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});