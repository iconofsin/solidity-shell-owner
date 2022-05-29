// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import "./IShellOwner.sol";
import "./Errors.sol";

abstract contract ShellOwnable {
    IShellOwner private shellOwnerContract;

    constructor(address shellOwnerContract_) {
        shellOwnerContract = IShellOwner(shellOwnerContract_);
    } 

    function _onlyOwner() internal view {
        if (msg.sender != owner()) revert Unauthorized();
    }

    function owner() public view returns (address) {
        return shellOwnerContract.owner();
    }
}
