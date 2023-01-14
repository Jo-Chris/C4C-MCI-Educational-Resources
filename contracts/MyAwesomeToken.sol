// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// Beispielcode zur Verwendung in Remix
// https://remix.ethereum.org/

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyAwesomeToken is ERC20 {
    constructor() ERC20("MyAwesomeToken", "MAT") {
        _mint(msg.sender, 1000 * 10**18);
    }
}