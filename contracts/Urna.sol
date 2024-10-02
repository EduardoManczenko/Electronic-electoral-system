// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./UrnaRegister.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract Urna is  Ownable, UrnaRegister{
   constructor(address _owner)
   Ownable(_owner)
   {

   }


   function createCandidate(candidateData memory data_, uint position_) public{
        createCandidate_(data_, position_);
   }

   function createElector(electorData memory data_, address owner_)public{
        createElector_(data_, owner_);
   }
}