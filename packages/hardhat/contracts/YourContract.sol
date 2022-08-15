pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YourContract is Ownable {

  uint256 public constant fee = 100000;

  event newData(string origin, string destination, string name, uint amount, string description, string status, address wallet);
  event sendFee(address client, uint fee);
  struct Data{string origin; string destination; string name; uint amount; string description; string status;}

  Data public data;

  constructor() payable {
    // what should we do on deploy?
  }

  function pushData(string memory _origin, string memory _destination, string memory _name, uint _amount, string memory _description, string memory _status) public payable {
  
    data = Data(_origin, _destination, _name, _amount, _description, _status);
    
    console.log("origin:", _origin);
    console.log("destination:", _destination);
    console.log("name:", _name);
    console.log("amount:", _amount);
    console.log("status:", _status);
    console.log("wallet:", msg.sender);
    emit newData(_name, _origin, _name, _amount, _description, _status, msg.sender);
    
    // Call returns a boolean value indicating success or failure.
    (bool sent, ) = msg.sender.call{value: fee}("");
    require(sent, "Failed to send Ether");
    
    console.log("fee!!!:", fee);        
    emit sendFee(msg.sender, fee);
  }

  function withDraw(uint _amount) external onlyOwner {
    payable(msg.sender).transfer(_amount);
  }

  // to support receiving ETH by default
  receive() external payable {}
  fallback() external payable {}
}
