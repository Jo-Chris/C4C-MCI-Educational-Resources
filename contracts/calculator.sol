// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;

contract Calculator {
    uint c;

    function add(uint a, uint b) public {
        c = a + b;
    }

    function sub(uint a, uint b) public {
        c = a - b;
    }

    function mul(uint a, uint b) public {
        c = a * b;
    }

    function div(uint a, uint b) public {
        require(b > 0, "The second parameter should be larger than 0");

        c = a / b;
    }

    // hash comparisons
    function allInOne(string memory action, uint param1, uint param2) public {
        if (keccak256(bytes(action)) == keccak256(bytes("mul"))) {
            c = param1 * param2;
        }

        // how would this go on?
    }

    function getResult() public view returns (uint x) {
        return c;
    }
}