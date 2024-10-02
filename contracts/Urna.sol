// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./UrnaStructs.sol";
import "./CandidateStructs.sol";
import "./ElectorStructs.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Elector.sol";
import "./Candidate.sol";


contract Urna is UrnaStructs, ElectorStructs, CandidateStructs, Ownable{
   constructor(address _owner)
   Ownable(_owner)
   {

   }


    //position: 1 president, 2 governor, 3 senator, 4 state deputie, 5 federal deputie
    function createCandidate(candidateData memory data_, uint position)public onlyOwner{
        Candidate candidate = new Candidate(data_, address(this));

        if(position == 1) candidates.presidents.push(address(candidate));
        if(position == 2) candidates.governors.push(address(candidate));
        if(position == 3) candidates.senators.push(address(candidate));
        if(position == 4) candidates.stateDeputies.push(address(candidate));
        if(position == 5) candidates.federalDeputies.push(address(candidate));
    }

    function createElector(address owner_, electorData memory data_)public onlyOwner{  
        Elector elector_ = new Elector(data_, owner_, address(this));
        elector[owner_] = address(elector_);
    }
}