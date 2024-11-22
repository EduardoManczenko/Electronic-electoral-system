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
    await deployers.urnaContractVerified(urnaData, "0x6c3f9f1687422C6C933AbbfC5F4c4B08A1Fcdd32")
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});