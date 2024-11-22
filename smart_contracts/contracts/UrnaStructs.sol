// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract UrnaStructs{
    mapping(uint => mapping(address => bool)) candidatesControl;
    mapping(uint => address[]) candidates;
    mapping(address => address) electorContracts;
    address[] electors;
}