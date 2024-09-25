// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./urna.sol";

contract candidate{
    string name;
    string describe;
    string candidatePhoto;
    string politicalPartyName;
    uint politicalPartyNumber;
    string electedTo;

    address urnaAddress;

    uint public totalVotes;

    mapping(address => bool) voteControl;

    constructor(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber, string memory _electedTo, address _urnaAddress){
        name = _name;
        describe = _describe;
        politicalPartyName = _politicalPartyName;
        politicalPartyNumber = _politicalPartyNumber;
        electedTo = _electedTo;
        candidatePhoto = _candidatePhoto;
        urnaAddress = _urnaAddress;

        totalVotes = 0;
    }

    modifier inTime(){
        urna ur = urna(urnaAddress);
        require(block.timestamp <= ur.time(), "ERROR: Time is over!");
        _;
    }

    modifier controlVote(){
        require(!voteControl[msg.sender], "ERROR: You have already voted!");
        urna ur = urna(urnaAddress);
        bool requestElector = ur.returnElectorPerm(elector(msg.sender));
        require(requestElector, "ERROR: You not are Elector!");
        _;
    }

    function voteInThisCandidate()public controlVote() inTime(){
        voteControl[msg.sender] = true;
        voteControl[tx.origin] = true;
        totalVotes += 1;
    }

    function returnName()external view returns(string memory){
        return name;
    }

    function returnDescribe()external view returns(string memory){
        return describe;
    }

    function returnPhote()external view returns(string memory){
        return candidatePhoto;
    }

    function returnPoliticalPartyName()external view returns(string memory){
        return politicalPartyName;
    }

    function returnPoliticalPartyNumber()external view returns(uint){
        return politicalPartyNumber;
    }

    function returnElectedTo()external view returns(string memory){
        return electedTo;
    }

    function returnTotalVotes()external view returns(uint){
        return totalVotes;
    }
}