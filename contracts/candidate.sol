// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;


import "./CandidateStructs.sol";

contract Candidate is CandidateStructs{
    candidateData data;
    address urna;
    uint public totalVotes;

    constructor(candidateData memory data_, address urna_){
        data = data_;
        urna = urna_;
    }

    modifier onlyUrna{
        require(msg.sender == urna, "Apenas a urna pode contabilizar votos");
        _;
    }

    function vote()public onlyUrna{
        totalVotes += 1;
    }

    function returnCandidateData()external view returns(candidateData memory){
        return data;
    }

    function returnVotes()external view returns(uint){
        return totalVotes;
    }
}