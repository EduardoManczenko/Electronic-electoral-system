// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract UrnaStructs{
    struct candidates{
        address[] federalDeputies;
        address[] stateDeputies;
        address[] senators;
        address[] governors;
        address[] presidents;
    }

    struct electors{
        address[] electors;
    }
}