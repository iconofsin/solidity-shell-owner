// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;

import "../shell/Errors.sol";

abstract contract OptimizedOwnable {
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    address private theOwner;

    constructor() {
        _transferOwnership(msg.sender);
    }

    function owner() external view returns (address) {
        return theOwner;
    }

    function transferOwnership(address newOwner) public {
        _onlyOwner();
        _transferOwnership(newOwner);
    }

    function _onlyOwner() internal view {
        if (msg.sender != theOwner) revert Unauthorized();
    }

    function _transferOwnership(address newOwner) internal {
        address oldOwner = theOwner;
        theOwner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

