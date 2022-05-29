// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import "./IShellOwner.sol";
import "./Errors.sol";

abstract contract ShellOwnableUpgradeable {
    IShellOwner private shellOwnerContract;

    function __ShellOwnableUpgradeable_init(address shellOwnerContract_) internal {
        shellOwnerContract = IShellOwner(shellOwnerContract_);
    }

    function _onlyOwner() internal view {
        if (msg.sender != owner()) revert Unauthorized();
    }

    function owner() public view returns (address) {
        return shellOwnerContract.owner();
    }
}
