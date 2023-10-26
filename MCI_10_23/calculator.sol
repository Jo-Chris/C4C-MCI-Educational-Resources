// SPDX-License-Identifier: GPL-3.0

// compiler version -->
pragma solidity ^0.8.18;

// comments, this is just a comment to not forget stuff
// gets ignored by the compiler

/*
multi line comments
*/

contract Calculator {
    // state variable
    // should store the result of every operation we do (add, sub, ...)
    uint result = 0;

    /* a simple function returning our name
        function - indicates a start of a new function
        getName() - the identifier of the function / "the name of the function"
        public - a modifier, indicates the reachability of the function (others: private, external)
        pure - means, it does neither READ nor WRITE nor MODIFY the state
        returns (type) - indicate to the compiler, that we return something of type
        return - the final statement of a function that returns something
        and dont forget the ;
     */
    function getName() public pure returns (string memory) {
        return "My name is Chris";
    }

    /* this function should add 2 values together
       uint parameter1 - the first parameter we can send to the function
       uint parameter2 - the second parameter we can send to the function
       both are of type uint, uint == uint256, meaning 0 to 2^256 values */
    function add(uint parameter1, uint parameter2) public {
        result = parameter1 + parameter2;
    }

    // create a sub function
    // that substrats one parameter from another
    // deploy the contract again and verify the result
    function sub(uint parameter1, uint parameter2) public {
        result = parameter1 - parameter2;
    }

    // multiply
    function mul(uint parameter1, uint parameter2) public {
        result = parameter1 * parameter2;
    }

    // division
    function div(uint parameter1, uint parameter2) public {
        result = parameter1 / parameter2;
    }

    // return whats stored inside the 'result'
    // every function: add, sub, mul, div stores their result to the 'result' variable
    function getResult() public view returns(uint) {
        return result;
    }

    // should calculate 2^10 = 1024
    function exp(uint parameter1, uint parameter2) public {
        result = parameter1 ** parameter2;
    }

    // those who are fast, do the mod() (modulo operation)
    // % is used to calculate the remainder of the division
    // 11 % 2 = 1
    // 2 % 5 = 2
    // check if a number is odd or even? do (param % 2) = either 0 or 1
    function mod(uint parameter1, uint parameter2) public {
        result = parameter1 % parameter2;
    }

    // working with strings
    // hashing strings, comparing strings
    // keccak256() - is used to create the hash of a string
    function compare(string memory a, string memory b) public pure returns (string memory) {
        /*
            a == b (if they are both numbers) will work!
            we cannot compare strings in solidity like a == b
            desired output? chris == chris
        */
        // creates the hash of the a parameter
        // creates the hash of the b parameter

        // this is the long form
        // bytes takes an parameter and converts from "string" -> "bytes"
        // keccak256 gets a "bytes" type and returns the hash

        bytes memory bytesOfA = bytes(a);
        bytes memory bytesOfB = bytes(b);
        bytes32 hashOfA = keccak256(bytesOfA);
        bytes32 hashOfB = keccak256(bytesOfB);

        if(hashOfA == hashOfB) {
            return "smooth. thats the same!";
        } else {
            return "nah, that does not seem right";
        }
        // short: keccak256(bytes(a)) == keccak256(bytes(b))
        // return hashOfA == hashOfB --> this is the same as keccak256(bytes(a)) == keccak256(bytes(b))
        // this is the short form
        // return keccak256(bytes(a)) == keccak256(bytes(b));
    }
}