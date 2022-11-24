// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


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

    constructor(){
        owner = msg.sender;
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
}

contract candidate{
    string name;
    string describe;
    string candidatePhoto;
    string politicalPartyName;
    uint politicalPartyNumber;
    string electedTo;

    address urnaAddress;

    uint totalVotes;

    mapping(address => bool) voteControl;

    constructor(string memory _name, string memory _describe, string memory _candidatePhoto, string memory _politicalPartyName, uint _politicalPartyNumber, string memory _electedTo, address _urnaAddress){
        name = _name;
        describe = _describe;
        politicalPartyName = _politicalPartyName;
        politicalPartyNumber = _politicalPartyNumber;
        electedTo = _electedTo;
        candidatePhoto = _candidatePhoto;
        urnaAddress = _urnaAddress;

        totalVotes = 0;
    }

    modifier controlVote(){
        require(!voteControl[msg.sender], "ERROR: You have already voted!");
        urna ur = urna(urnaAddress);
        bool requestElector = ur.returnElectorPerm(elector(msg.sender));
        require(requestElector, "ERROR: You not are Elector!");
        _;
    }

    

    function voteInThisCandidate()public controlVote(){
        voteControl[msg.sender] = true;
        voteControl[tx.origin] = true;
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

    function returnVote(uint _choice)external view onlyOwner() returns(candidate){
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