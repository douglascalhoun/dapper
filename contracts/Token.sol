//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100_000 * (10 ** 18));
    }

}


// contract Token {
//     string public name = "dougcoin";
//     string public symbol = "DUG";
//     uint public total_supply = 1_000_000;
//     mapping (address => uint) balances;

//     constructor() {
//         balances[msg.sender] = total_supply;
//     }

//     function transfer (address _to, uint _amount) external {
//         require(balances[msg.sender] >= _amount, "You do not have enough tokens to complete transaction");
//         balances[msg.sender] -= _amount;
//         balances[_to] += _amount;
//     }

//     function balanceOf(address _account) external view returns (uint) {
//         return balances[_account];
//     }
// }