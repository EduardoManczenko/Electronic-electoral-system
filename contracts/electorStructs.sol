// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract ElectorStructs{
    struct electorData{
        string name;
        string cpf;
    }

    struct electorVote{
        address federalDuputieVoted;
        address stateDeputieVoted;
        address senatorVoted;
        address governorVoted;
        address presidentVoted;
    }
}