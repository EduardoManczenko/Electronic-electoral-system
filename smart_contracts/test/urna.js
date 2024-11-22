const { expect } = require('chai')
const deploy = require("../scripts/deploy.js")
const { ethers } = require('hardhat')
const { HARDHAT_MEMPOOL_SUPPORTED_ORDERS } = require("hardhat/internal/constants");


let urna

let [tse, elector1, elector2, elector3, elector4, elector5, candidate1, cadidate2, cadidate3, cadidate4, cadidate5] = []

describe('Urna Contract', function(){
    it('testUrnaDeploy', async function(){
       
        urna = await deploy.urna()
       
    })

    it('getUsers', async function(){
        [tse, elector1, elector2, elector3, elector4, elector5, candidate1, cadidate2, cadidate3, cadidate4, cadidate5] = await ethers.getSigners()
    })

    describe('createCandidate()', function(){
        it('verificar se a carteira do tse pode criar um candidato', async function(){

            const candidateData = {
                name: "rodriguin verde",
                describe: "um mundo com mais natureza!",
                candidatePhoto: "wwww.com.br/minhafoto.png",
                politicalPartyName: "NOME_PARTIDO",
                politicalPartyNumber: "00",
                votes: 0
            };

            await urna.contract.connect(tse).createCandidate(candidateData, 1)

            const candidate = await urna.contract.verifyCandidates(1);
            expect(candidate[0].length).to.equal(1);
        })
        it('verificar se outro endereco nao pode criar um candidato', async function(){
            const candidateData = {
                name: "rodriguin verde",
                describe: "um mundo com mais natureza!",
                candidatePhoto: "wwww.com.br/minhafoto.png",
                politicalPartyName: "NOME_PARTIDO",
                politicalPartyNumber: "00",
                votes: 0
            };

            await expect(urna.contract.connect(elector1).createCandidate(candidateData, 1)).to.be.revertedWithCustomError(urna.contract, "OwnableUnauthorizedAccount")
        })
    })

    describe('createElector()', async function(){
        it('verificar se a carteira do tse pode criar um eleitor', async function(){
            const electorData = {
                name: "nome_criptografado",
                cpf: "cpf_criptografado"
            }
            await urna.contract.connect(tse).createElector(electorData, elector1.address)

            const elector = await urna.contract.verifyElectors();
            expect(elector.length).to.equal(1);
        })
        it('verificar se outro endereco nao pode criar um eleitor', async function(){
            const electorData = {
                name: "nome_criptografado",
                cpf: "cpf_criptografado"
            }
            await expect(urna.contract.connect(elector1).createElector(electorData, elector2.address)).to.be.revertedWithCustomError(urna.contract, "OwnableUnauthorizedAccount")
        })
    })

    describe('vote()', async function(){
        it('verificar se um endereco de eleitor valido pode votar', async function(){
            const candidate = await urna.contract.verifyCandidates(1);
            
            await urna.contract.connect(elector1).vote(candidate[0][0], 1);

            const votes = await urna.contract.verifyVotes(candidate[0][0]);

            expect(votes).to.equal(1)
        })
        it('verificar se um endereco de eleitor invalido nao pode votar', async function(){
            const candidate = await urna.contract.verifyCandidates(1);

            await expect(urna.contract.connect(elector2).vote(candidate[0][0], 1)).to.be.revertedWithCustomError(urna.contract, "electorNotFound")
        })
        it('verificar se nao e possivel votar para uma posicao que o eleitor ja tenha votado', async function(){
            const candidate = await urna.contract.verifyCandidates(1);

            await expect(urna.contract.connect(elector1).vote(candidate[0][0], 1)).to.be.revertedWithCustomError(urna.contract, "alreadyVoted_");
        })
        it('verificar se nao e possivel votar em um candidato que nao exista', async function(){
            const candidate = await urna.contract.verifyCandidates(1);

            await expect(urna.contract.connect(elector1).vote(elector1, 2)).to.be.revertedWithCustomError(urna.contract, "candidadeNotFound");
        })
    })
})