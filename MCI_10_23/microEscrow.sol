// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MicroEscrow {

    // the payer
    address public payer;
    // receiver of the funds
    address public payee = 0x9f6df194F2cb4B3F22D9661465f0F384E8a6d71B;
    // can release and refund funds
    address public arbiter = 0x81C2016c97970752080554d0Ed365717D597076C;

    constructor() {
        payer = msg.sender;
    }

    function deposit() public payable {
        require(msg.sender == payer, "Only payer can deposit");
        require(msg.value > 0, "Must send some Ether to deposit");
    }

    function release() public {
        require(msg.sender == arbiter, "Only arbiter can release funds");
        payable(payee).transfer(address(this).balance);
    }

    function refund() public {
        require(msg.sender == arbiter, "Only arbiter can refund");
        payable(payer).transfer(address(this).balance);
    }
}

