// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./UrnaRegister.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract Urna is  Ownable, UrnaRegister{


   constructor(address _owner)
   Ownable(_owner)
   {

   }

    modifier onlyElector{
        require(elector[msg.sender] != address(0));
        _;
    }

    function vote(address candidate)public onlyElector{
        votes[candidate]++;
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