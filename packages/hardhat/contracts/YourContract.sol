pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";

contract YourContract {

  address payable public owner;

  event newData(string origin, string destination, string name, uint amount, string description, string status, address wallet);
  event sendFee(address client, uint fee);
  
  string public origin;
  string public destination;
  string public name;
  uint public  amount;
  string public description;
  string public status;

  constructor() payable {
    // what should we do on deploy?
    owner = payable(msg.sender);
  }

  function pushData(string memory _origin, string memory _destination, string memory _name, uint _amount, string memory _description, string memory _status) public payable {
        
    origin = _origin;
    destination = _destination;
    name = _name;
    amount = _amount;
    description = _description;
    status = _status;
    
    console.log("origin:", _origin);
    console.log("destination:", _destination);
    console.log("name:", _name);
    console.log("amount:", _amount);
    console.log("status:", _status);
    console.log("wallet:", msg.sender);
    emit newData(_name, _origin, _name, _amount, _description, _status, msg.sender);
    
    // Call returns a boolean value indicating success or failure.
    (bool sent, ) = msg.sender.call{value: msg.value}("");
    require(sent, "Failed to send Ether");
    
    console.log("address:", msg.sender);
    console.log("fee!!!:", msg.value);        
    emit sendFee(msg.sender, msg.value);
  }

  function withDraw(uint _amount) external {
    require(msg.sender == owner, "caller is not owner");
    payable(msg.sender).transfer(_amount);
  }

  // to support receiving ETH by default
  receive() external payable {}
  fallback() external payable {}
}
