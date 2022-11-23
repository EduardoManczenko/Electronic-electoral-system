// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



contract candidateFactory{
    candidate[] public federalDeputies;
    candidate[] public stateDeputies;
    candidate[] public senators;
    candidate[] public governors;
    candidate[] public presidents;

    address owner;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "ERROR: You're not the owner!");
        _;
    }

    function newCandidateFederalDeputie(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber) onlyOwner() public {
        candidate newCandidate = new candidate(_name, _describe, _candidatePhoto, _politicalPartyName, _politicalPartyNumber, "Federal Deputie");
        federalDeputies.push(newCandidate);
    }

    function newCandidateStateDeputie(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber) onlyOwner() public {
        candidate newCandidate = new candidate(_name, _describe, _candidatePhoto, _politicalPartyName, _politicalPartyNumber, "State Deputie");
        stateDeputies.push(newCandidate);
    }

    function newCandidateSenator(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber) onlyOwner() public {
        candidate newCandidate = new candidate(_name, _describe, _candidatePhoto, _politicalPartyName, _politicalPartyNumber, "Senator");
        senators.push(newCandidate);
    }

    function newCandidateGovernor(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber) onlyOwner() public {
        candidate newCandidate = new candidate(_name, _describe, _candidatePhoto, _politicalPartyName, _politicalPartyNumber, "Governor");
        governors.push(newCandidate);
    }

    function newCandidatePresident(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber) onlyOwner() public {
        candidate newCandidate = new candidate(_name, _describe, _candidatePhoto, _politicalPartyName, _politicalPartyNumber, "President");
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
}


contract candidate{
    string name;
    string describe;
    string candidatePhoto;
    string politicalPartyName;
    uint politicalPartyNumber;
    string electedTo;

    uint totalVotes;

    mapping(address => bool) voteControl;

    constructor(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber, string memory _electedTo){
        name = _name;
        describe = _describe;
        politicalPartyName = _politicalPartyName;
        politicalPartyNumber = _politicalPartyNumber;
        electedTo = _electedTo;
        candidatePhoto = _candidatePhoto;
        
        totalVotes = 0;
    }

    modifier controlVote(){
        require(!voteControl[msg.sender], "ERROR: You have already voted!");
        _;
    }

    function voteInThisCandidate()public controlVote(){
        voteControl[msg.sender] = true;
        totalVotes += 1;
    }

    function returnName()external view returns(string memory){
        return name;
    }

    function returnDescribe()external view returns(string memory){
        return describe;
    }

    function returnPhote()external view returns(string memory){
        return candidatePhoto;
    }

    function returnPoliticalPartyName()external view returns(string memory){
        return politicalPartyName;
    }

    function returnPoliticalPartyNumber()external view returns(uint){
        return politicalPartyNumber;
    }

    function returnElectedTo()external view returns(string memory){
        return electedTo;
    }

    function returnTotalVotes()external view returns(uint){
        return totalVotes;
    }
}


contract electorFactory{
    address owner;

    elector[] electors;
    mapping(string => bool) cpfControl;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "ERROR: You're not the owner!");
        _;
    }

    function newElector(string memory _name, string memory _cpf) onlyOwner() public{
        require(!cpfControl[_cpf], "ERROR: cpf already registered!");
        cpfControl[_cpf] = true;

        elector Elector = new elector(_name, _cpf, msg.sender);
        electors.push(Elector);
    }

    function viewElectors() public view returns(elector[] memory){
        return electors;
    }
}

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
        choice.voteInThisCandidate();
    }

    function voteStateDeputies(address _candidateAddress)external onlyOwner(){
        require(!voteControlSenators[msg.sender], "ERROR: You already voted for this position");
        voteControlStateDeputies[msg.sender] = true;
        candidate choice = candidate(_candidateAddress);
        choice.voteInThisCandidate();
    }

    function voteSenator(address _candidateAddress)external onlyOwner(){
        require(!voteControlSenators[msg.sender], "ERROR: You already voted for this position");
        voteControlSenators[msg.sender] = true;
        candidate choice = candidate(_candidateAddress);
        choice.voteInThisCandidate();
    }

    function voteGovernor(address _candidateAddress)external onlyOwner(){
        require(!voteControlGovernors[msg.sender], "ERROR: You already voted for this position");
        voteControlGovernors[msg.sender] = true;
        candidate choice = candidate(_candidateAddress);
        choice.voteInThisCandidate();
    }

    function votePresident(address _candidateAddress)external onlyOwner(){
        require(!voteControlPresidents[msg.sender], "ERROR: You already voted for this position");
        voteControlPresidents[msg.sender] = true;
        candidate choice = candidate(_candidateAddress);
        choice.voteInThisCandidate();
    }
}