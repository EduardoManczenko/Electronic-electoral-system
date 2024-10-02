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

        if(position_ == 1) candidates.presidents.push(address(candidate));
        if(position_ == 2) candidates.governors.push(address(candidate));
        if(position_ == 3) candidates.senators.push(address(candidate));
        if(position_ == 4) candidates.stateDeputies.push(address(candidate));
        if(position_ == 5) candidates.federalDeputies.push(address(candidate));
    }

    function createElector_( electorData memory data_, address owner_)internal{  
        Elector elector_ = new Elector(data_, owner_, address(this));
        elector[owner_] = address(elector_);
    }
}