// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./candidate.sol";


contract elector{
    string name;
    string cpf;
    address owner;
    
    candidate federalDeputieVoted;
    candidate stateDeputieVoted;
    candidate senatorVoted;
    candidate governorVoted;
    candidate presidentVoted;


    mapping(address => bool) voteControlFederalDeputies;
    mapping(address => bool) voteControlStateDeputies;
    mapping(address => bool) voteControlSenators;
    mapping(address => bool) voteControlGovernors;
    mapping(address => bool) voteControlPresidents;


    constructor(string memory _name, string memory _cpf, address _owner){
        name = _name;
        cpf = _cpf;
        owner = _owner;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "ERROR: You're not the owner!");
        _;
    }

    function voteFederalDeputies(address _candidateAddress)external onlyOwner(){
        require(!voteControlFederalDeputies[msg.sender], "ERROR: You already voted for this position");
        voteControlFederalDeputies[msg.sender] = true;
        candidate choice = candidate(_candidateAddress);
        federalDeputieVoted = choice;
        choice.voteInThisCandidate();
    }

    function voteStateDeputies(address _candidateAddress)external onlyOwner(){
        require(!voteControlSenators[msg.sender], "ERROR: You already voted for this position");
        voteControlStateDeputies[msg.sender] = true;
        candidate choice = candidate(_candidateAddress);
        stateDeputieVoted = choice;
        choice.voteInThisCandidate();
    }

    function voteSenator(address _candidateAddress)external onlyOwner(){
        require(!voteControlSenators[msg.sender], "ERROR: You already voted for this position");
        voteControlSenators[msg.sender] = true;
        candidate choice = candidate(_candidateAddress);
        senatorVoted = choice;
        choice.voteInThisCandidate();
    }

    function voteGovernor(address _candidateAddress)external onlyOwner(){
        require(!voteControlGovernors[msg.sender], "ERROR: You already voted for this position");
        voteControlGovernors[msg.sender] = true;
        candidate choice = candidate(_candidateAddress);
        governorVoted = choice;
        choice.voteInThisCandidate();
    }

    function votePresident(address _candidateAddress)external onlyOwner(){
        require(!voteControlPresidents[msg.sender], "ERROR: You already voted for this position");
        voteControlPresidents[msg.sender] = true;
        candidate choice = candidate(_candidateAddress);
        presidentVoted = choice;
        choice.voteInThisCandidate();
    }

    function returnElectorName()external view onlyOwner() returns(string memory){
        return name;
    }

    function returnElectorCpf()external view onlyOwner() returns(string memory){
        return cpf;
    }

    function returnOwner()external view onlyOwner() returns(address){
        return owner;
    }

    function returnVote(uint _choice)external view onlyOwner() returns(candidate vote){
        // 1 federal deputie
        // 2 state deputie
        // 3 senator
        // 4 governor
        // 5 president
        if(_choice == 1){
            return federalDeputieVoted;
        }else if(_choice == 2){
            return stateDeputieVoted;
        }else if(_choice == 3){
            return senatorVoted;
        }else if(_choice == 4){
            return governorVoted;
        }else if(_choice == 5){
            return presidentVoted;
        }
    }
}