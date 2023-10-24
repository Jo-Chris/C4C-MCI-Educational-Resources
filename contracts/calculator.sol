// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;

contract AwesomeCalculator {
    // state var!
    // uint is the same as uint256
    uint result = 0; // does not have () because it is not a function!

    // function keyword - indicates the start of a function
    // getName() => the identifier / the name of the function
    // public => accessible from outside and inside (everyone!)
    // pure => does not mutate the state... what does that mean? we'll see later
    // returns (type) => indicates, that this function returns a value back
    // return "Welc..." => the return value, this gets returned from the function
    function getName() public pure returns (string memory) {
        return "Welcome to my awesome calculator";
    }

    // view indicates, that we do not modify the state (hence, the result variable)
    // pure on the other hand is even more restrictive, it indicates
    // ... that we are not even returning state!
    // remember as this: pure can live on "its own"
    function getResult() public view returns (uint) {
        return result;
    }

    function add(uint param1, uint param2) public {
        // calculate something and store it into the result variable
        result = param1 + param2;
        // result does no longer store 0, but the addition of the two params(1/2)
    }

    // create the multiplication function
    // update the 'result' variable after the multiplication
    // do a mul(); write operation (on the left side under deployed contracts)
    // do a read operation of the value
    function mul(uint param1, uint param2) public pure {
        param1 * param2;
    }

    // your task again:
    // add the functions
    // sub() - substraction
    // expo() - exponentiation
    // mod() - modulo operation (remainder of the division)
    function expo(uint param1, uint param2) public {
        result = param1 ** param2;
    }

    function mod(uint param1, uint param2) public {
        result = param1 % param2;
    }

    // string example
    // whats a string? --> text!
    function compare(string memory param1, string memory param2) public pure returns (bool)  {
        // quick excursion to string comparison:
        // in other programming languages, we can do the following
        /*
            string myName = 'chris'
            string otherName = 'kevin'


        // reference, whenever we compare strings, this does not work:
        if (param1 == param2) {
            return "Hey nice, they match!";
        } else {
            return "Ooouch, they do not match!";
        }
        */
        // we return a bool'sche value here
        // 👇 This is a function signature
        // 👇 It indicates how the function is used
        // - (which parameters we need to provide)
        // - (and what return type we get back)
        // >>> keccak256(bytes memory) returns (bytes32) <<<


        // long version of hashing a string
        // convert from string -> bytes -> hashing = bytes32
        // --- bytes memory myStringAsBytes = bytes(param1);
        // --- bytes32 myResult = keccak256(myStringAsBytes);
        // short version
        // --- keccak256(bytes(param1));

        return keccak256(bytes(param1)) == keccak256(bytes(param2));
    }

    function comparedIf(
        string memory name1,
        string memory name2
    ) public pure returns (string memory) {
        if(compare(name1, name2)) {
            return "They match! Niceeeee";
        } else {
            return "Ooouch... not really working.";
        }
    }

    // this calculator is a bit rusty. With what we know now,
    // we do not need a function for each case (case = mul, sub, add)
    // we rather can one function called <<insert your desired name, up to you>>
    // that should get the operation as a parameter (like mul, add, sub)
    // and two parameters (param1, param2)
    // and return the result of the operation
    function theGodCalculator() public {
        // inside here, everything from above should workd
    }

    function theGodCalculatorFn(
        string memory operation,
        uint param1,
        uint param2
    ) public pure returns (uint) {
        // hash of the operation is known
        bytes32 operationHash = keccak256(bytes(operation));

        // check which operation matches
        if(operationHash == keccak256(bytes("mul"))) {
            return param1 * param2;
        } else if (operationHash == keccak256(bytes("sub"))) {
            return param1 - param2;
        } else if (operationHash == keccak256(bytes("add"))) {
            return param1 + param2;
        } else if (operationHash == keccak256(bytes("exp"))) {
            return param1 ** param2;
        } else if (operationHash == keccak256(bytes("mod"))) {
            return param1 % param2;
        }  else if (operationHash == keccak256(bytes("div"))) {
            return param1 / param2;
        } else {
            // none of the above matches, bad call :(
            revert("Read the code, this operation does not exist!");
        }
    }
}



