// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// will be uploaded to github
contract TransferExampleContract {
    uint amount = 0.0001 ether;
    address payer1;
    address payable payer2;

    // make it possible
    // to transfer something to the contract
    function deposit() public payable {
        require(msg.value >= amount, "not enough sent");
        if(payer1 == address(0)) {
            payer1 = msg.sender;
        } else {
            // hint: this transfers something (amount) to someone
            payable(payer1).transfer(amount);
            payable(msg.sender).transfer(amount);
        }
    }
}