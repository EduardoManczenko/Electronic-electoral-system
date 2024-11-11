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

    function verifyCandidates(uint position_) public view returns(address[] memory){
        return candidates[position_];
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