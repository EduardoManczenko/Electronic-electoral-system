// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./ElectorStructs.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Elector is ElectorStructs, Ownable{
    electorData data;
    address urna;

    constructor(electorData memory data_, address _owner, address _urna)
    Ownable(_owner)
    {
        data = data_;
        urna = _urna;
    }


    function returnElectorData()external view returns(electorData memory){
        return data;
    }
}