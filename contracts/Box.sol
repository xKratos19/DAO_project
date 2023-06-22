// SPDX-License-Identifier : UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Box is Ownable {
  uint256 private value;

  event ValueChanged(uint256 newValue);

  function store(uint256 newValue) public onlyOwner{
    value = newValue;

    emit ValueChanged(newValue);
  }

  function retriece() public view returns(uint256){
    return value;
  }
}