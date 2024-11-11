// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract UrnaVoteControl {
    mapping(address => mapping(uint => bool)) voteControl;

    function verifyIfVoted(address elector, uint position) internal view returns(bool){
        return voteControl[elector][position];
    }

    function setVoteControl(address elector, uint position)internal{
        voteControl[elector][position] = true;
    }
}