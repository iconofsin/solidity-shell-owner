// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;

import "../oz/OptimizedOwnable.sol";

/// @title "The special purpose vehicle" Shell Ownership contract
/// @dev Transferring ownership of this contract will transfer ownership of the whole group.
///      This is deployed first.
contract SPVOwner is OptimizedOwnable {
    constructor() {}
}

