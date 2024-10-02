// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;


import "./CandidateStructs.sol";

contract Candidate is CandidateStructs{
    candidateData data;
    address urna;

    constructor(candidateData memory data_, address urna_){
        data = data_;
        urna = urna_;
    }


    function returnCandidateData()external view returns(candidateData memory){
        return data;
    }
}