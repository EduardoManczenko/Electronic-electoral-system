// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./candidate.sol";
import "./elector.sol";

contract urna{
    //candidates
    candidate[] public federalDeputies;
    candidate[] public stateDeputies;
    candidate[] public senators;
    candidate[] public governors;
    candidate[] public presidents;

    //elector
    elector[] public electors;
    mapping(elector => bool) electorsAddressVoteControl;
    mapping(string => bool) cpfControl;
    mapping(address => elector) electorAddressKey;

    //TSE owner
    address owner;

    uint public time;

    constructor(uint time_){
        owner = msg.sender;
        time = block.timestamp + (time_ * 1 days);
    }
    
    modifier inTime(){
        require(block.timestamp <= time, "ERROR: Time is over!");
        _;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "ERROR: You're not the owner!");
        _;
    }



    //Candidates
    function newCandidateFederalDeputie(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber) onlyOwner() public {
        candidate newCandidate = new candidate(_name, _describe, _candidatePhoto, _politicalPartyName, _politicalPartyNumber, "Federal Deputie", address(this));
        federalDeputies.push(newCandidate);
    }

    function newCandidateStateDeputie(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber) onlyOwner() public {
        candidate newCandidate = new candidate(_name, _describe, _candidatePhoto, _politicalPartyName, _politicalPartyNumber, "State Deputie", address(this));
        stateDeputies.push(newCandidate);
    }

    function newCandidateSenator(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber) onlyOwner() public {
        candidate newCandidate = new candidate(_name, _describe, _candidatePhoto, _politicalPartyName, _politicalPartyNumber, "Senator", address(this));
        senators.push(newCandidate);
    }

    function newCandidateGovernor(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber) onlyOwner() public {
        candidate newCandidate = new candidate(_name, _describe, _candidatePhoto, _politicalPartyName, _politicalPartyNumber, "Governor", address(this));
        governors.push(newCandidate);
    }

    function newCandidatePresident(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber) onlyOwner() public {
        candidate newCandidate = new candidate(_name, _describe, _candidatePhoto, _politicalPartyName, _politicalPartyNumber, "President", address(this));
        presidents.push(newCandidate);
    }

    function viewCandidatesFederalDeputies()public view returns(candidate[] memory){
        return federalDeputies;
    }

    function viewCandidatesStateDeputies()public view returns(candidate[] memory){
        return stateDeputies;
    }

    function viewCandidatesSenators()public view returns(candidate[] memory){
        return senators;
    }

    function viewCandidatesGovernors()public view returns(candidate[] memory){
        return governors;
    }

    function viewCandidatesPresidents()public view returns(candidate[] memory){
        return presidents;
    }


    //elector
    function newElector(string memory _name, string memory _cpf, address _owner) onlyOwner() public{
        require(!cpfControl[_cpf], "ERROR: cpf already registered!");
        cpfControl[_cpf] = true;
        elector Elector = new elector(_name, _cpf, _owner);
        electorsAddressVoteControl[Elector] = true;
        electorAddressKey[_owner] = Elector;
        electors.push(Elector);
    }

    function viewElectors() public view returns(elector[] memory){
        return electors;
    }

    function returnElectorPerm(elector _address) public view returns(bool){
        return electorsAddressVoteControl[_address];
    }

    function returnElectorAddressKey()external view returns(elector){
        return electorAddressKey[msg.sender];
    }

    function viewTotalVotes(address candidate_)external view returns(uint){
        candidate x = candidate(candidate_);
        return x.returnTotalVotes();
    }
}