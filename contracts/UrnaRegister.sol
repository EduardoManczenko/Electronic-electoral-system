// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./Elector.sol";
import "./Candidate.sol";

import "./CandidateStructs.sol";
import "./ElectorStructs.sol";
import "./UrnaStructs.sol";


contract UrnaRegister is ElectorStructs, CandidateStructs, UrnaStructs{
     //position: 1 president, 2 governor, 3 senator, 4 state deputie, 5 federal deputie
    function createCandidate_(candidateData memory data_, uint position_)internal{
        Candidate candidate = new Candidate(data_, address(this));  
        candidatesControl[position_][address(candidate)] = true;
        candidates[position_].push(address(candidate));
    }

    function createElector_(electorData memory data_, address owner_)internal{  
        Elector elector_ = new Elector(data_, owner_, address(this));
        electorContracts[owner_] = address(elector_);
        electors.push(address(elector_));
    }

    function verifyIfCandidateExists(address candidate_, uint position_)internal view returns(bool){
        return candidatesControl[position_][candidate_];
    }
    
    function verifyIfElectorExists(address elector_)internal view returns(bool){
        return electorContracts[elector_] != address(0); // se retornar false nao existe
    }
}