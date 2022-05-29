// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;

import "../oz/OptimizedOwnable.sol";

// I AM THE GROUP LEADER, I'll be deployed first
contract GroupLeader is OptimizedOwnable {
    constructor() {}

    /// @notice Only the owner of `shellOwner` is allowed.
    function withdraw() external {
        _onlyOwner();
        payable(msg.sender).transfer(address(this).balance);
    }
}
