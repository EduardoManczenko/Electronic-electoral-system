// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract UrnaStructs{
    mapping(uint => mapping(address => bool)) candidates;
    
    mapping(address => address) elector;
    mapping(address => uint) votes;
    
}