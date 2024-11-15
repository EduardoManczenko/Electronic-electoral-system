// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./UrnaRegister.sol";
import "./UrnaVoteControl.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract Urna is  Ownable, UrnaRegister, UrnaVoteControl{


    event voted(address elector, address candidate, uint candidate_total_votes);

    error alreadyVoted_(address elector, uint position);
    error candidadeNotFound(address candidate);
    error electorNotFound(address elector);
    error candidateNotExists(uint ppn);

   constructor(address _TSE)
   Ownable(_TSE)
   {

   }

     //position: 1 president, 2 governor, 3 senator, 4 state deputie, 5 federal deputie
    function vote(address candidate, uint position)public {
        bool alreadyVoted = verifyIfVoted(msg.sender, position);
        if(alreadyVoted) revert alreadyVoted_(msg.sender, position);

        bool candidateExists = verifyIfCandidateExists(candidate, position);
        if(!candidateExists) revert candidadeNotFound(candidate);

        bool electorExists = verifyIfElectorExists(msg.sender);
        if(!electorExists) revert electorNotFound(msg.sender);

        setVoteControl(msg.sender, position);
        votes[candidate]++;
        
        emit voted(msg.sender, candidate, votes[candidate]);
    }

    function verifyVotes(address candidate) public view returns(uint){
        return votes[candidate];
    }

    function verifyCandidates(uint position_) public view returns(address[] memory candidateAddress , uint[] memory politicalPartyNumber){

        uint[] memory partyNumbers = new uint[](candidates[position_].length);

        for(uint i = 0; i < partyNumbers.length; i++){
            Candidate candidate = Candidate(candidates[position_][i]);
            candidateData memory data = candidate.returnCandidateData();
            partyNumbers[i] = data.politicalPartyNumber;
        }

        return (candidates[position_], partyNumbers);
    }

    function verifyCandidatesByPPN(uint position_, uint ppn) public view returns(address){
        (address[] memory candidateAddress, uint[] memory candidatePNN) = verifyCandidates(position_);

        for(uint i = 0; i <= candidateAddress.length; i++){
            if(candidatePNN[i] == ppn){
                return candidateAddress[i];
            }
        }
        revert candidateNotExists(ppn);
    }

    function verifyCandidatesData(uint position_) public view returns(candidateData[] memory){
        candidateData[] memory allData = new candidateData[](candidates[position_].length);

        for(uint i = 0; i < allData.length; i++){
            Candidate candidate = Candidate(candidates[position_][i]);
            candidateData memory data = candidate.returnCandidateData();
            allData[i] = data;
        }

        return allData;
    }

    function verifyElectors()public view returns(address[] memory){
        return electors;
    }

    function createCandidate(candidateData memory data_, uint position_) public onlyOwner{
        createCandidate_(data_, position_);
    }

    function createElector(electorData memory data_, address owner_)public onlyOwner{
        createElector_(data_, owner_);
    }
}