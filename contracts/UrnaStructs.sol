// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract UrnaStructs{
    struct Candidates{
        address[] federalDeputies;
        address[] stateDeputies;
        address[] senators;
        address[] governors;
        address[] presidents;
    }

    Candidates candidates;
    mapping(address => address) elector;
    mapping(address => uint) votes;
}