export const URNA_ADDRESS: any = "0x00"

export const ABI: any = {
    voteFunction: "function vote(address candidate, uint position)",
    verifyVotesFunction: "function verifyVotes(address candidate) public view returns(uint)",
    verifyCandidatesFunction: "function verifyVotes(address candidate) public view returns(uint)",
    createCandidateFunction: "function createCandidate(tuple(string name, string describe, string candidatePhoto, string politicalPartyName, string politicalPartyNumber) data_, uint position_)",
    createElectorFunction: " function createElector(tuple(string name, string cpf) data_, address owner_)"
} 