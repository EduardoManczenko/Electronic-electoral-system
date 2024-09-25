// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;


import "./electorStructs.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract elector is electorStructs, Ownable{
    electorData data;
    electorVote votes;

    constructor(string memory _name, string memory _cpf, address _owner)
    Ownable(_owner)
    {
        data = electorData(_name, _cpf);
    }

    function voteFederalDeputies(address _candidateAddress)external onlyOwner(){
        require(votes.federalDuputieVoted == address(0), "ERROR: You already voted for this position");
        votes.federalDuputieVoted = _candidateAddress;
    }

    function voteStateDeputies(address _candidateAddress)external onlyOwner(){
       require(votes.stateDeputieVoted == address(0), "ERROR: You already voted for this position");
       votes.stateDeputieVoted = _candidateAddress;
    }

    function voteSenator(address _candidateAddress)external onlyOwner(){
        require(votes.senatorVoted == address(0), "ERROR: You already voted for this position");
        votes.senatorVoted = _candidateAddress;
    }

    function voteGovernor(address _candidateAddress)external onlyOwner(){
        require(votes.governorVoted == address(0), "ERROR: You already voted for this position");
        votes.governorVoted = _candidateAddress;
    }

    function votePresident(address _candidateAddress)external onlyOwner(){
        require(votes.presidentVoted == address(0), "ERROR: You already voted for this position");
        votes.presidentVoted = _candidateAddress;
    }

    function returnElectorData()external view returns(electorData memory){
        return data;
    }

    function returnVote()external view returns(electorVote memory){
        return votes;
    }
}