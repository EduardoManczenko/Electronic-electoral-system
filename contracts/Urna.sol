// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./UrnaStructs.sol";
import "./CandidateStructs.sol";
import "./ElectorStructs.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Elector.sol";


contract Urna is UrnaStructs, ElectorStructs, CandidateStructs, Ownable{
   constructor(address _owner)
   Ownable(_owner)
   {

   }


   function createElector(address owner_, string memory name_, string memory cpf_)public onlyOwner{  
        electorData memory data_ = electorData(name_, cpf_);
        Elector elector_ = new Elector(data_, owner_, address(this));
        elector[owner_] = address(elector_);
   }
    
}