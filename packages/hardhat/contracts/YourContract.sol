pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; 
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract YourContract {

  event newData(
      string origin,
      string destination,
      string name,
      uint amount,
      string description,
      string status,
      address wallet
  );

  event SetPurpose(address sender, string purpose);

  string public purpose = "Hello word xD";
  string public origin;
  string public destination;
  string public name;
  uint public  amount;
  string public description;
  string public status;
  address public wallet;

  constructor() payable {
    // what should we do on deploy?
  }

  function setPurpose(string memory newPurpose) public {
      purpose = newPurpose;
      console.log(msg.sender,"set purpose to",purpose);
      emit SetPurpose(msg.sender, purpose);
  }

  function pushData(string memory _origin,
                    string memory _destination, 
                    string memory _name,
                    uint _amount,
                    string memory _description,
                    string memory _status) public {
        
        origin = _origin;
        destination = _destination;
        name = _name;
        amount = _amount;
        description = _description;
        status = _status;
        wallet = msg.sender;
        
        console.log("origin:", _origin);
        console.log("destination:", _destination);
        console.log("name:", _name);
        console.log("amount:", _amount);
        console.log("status:", _status);
        console.log("wallet:", wallet);
        
        

        emit newData(_name,
                    _origin,
                    _name,
                    _amount,
                    _description,
                    _status,
                    msg.sender);
    }

  // to support receiving ETH by default
  receive() external payable {}
  fallback() external payable {}
}
