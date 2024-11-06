// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./UrnaRegister.sol";
import "./UrnaVoteControl.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract Urna is  Ownable, UrnaRegister, UrnaVoteControl{


    event voted(address elector, address candidate, uint candidate_total_votes);

    error alreadyVoted_(address elector, uint position);

   constructor(address _owner)
   Ownable(_owner)
   {

   }

    modifier onlyElector{
        require(elector[msg.sender] != address(0));
        _;
    }
     //position: 1 president, 2 governor, 3 senator, 4 state deputie, 5 federal deputie
    function vote(address candidate, uint position)public onlyElector{
        bool alreadyVoted = verifyIfVoted(msg.sender, position);
        if(alreadyVoted) revert alreadyVoted_(msg.sender, position);

        setVoteControl(msg.sender, position);
        votes[candidate]++;
        
        emit voted(msg.sender, candidate, votes[candidate]);
    }

    function verifyVotes(address candidate) public view returns(uint){
        return votes[candidate];
    }

    function createCandidate(candidateData memory data_, uint position_) public{
        createCandidate_(data_, position_);
    }

    function createElector(electorData memory data_, address owner_)public{
        createElector_(data_, owner_);
    }
}