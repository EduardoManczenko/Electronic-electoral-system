// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract CandidateStructs{
    struct candidateData{
        string name;
        string describe;
        string candidatePhoto;
        string politicalPartyName;
        uint politicalPartyNumber;
        uint electedTo; // 1: president, 2: governor, 3: senator, 4: stateDeputie, 5: federalDeputie
    }
}