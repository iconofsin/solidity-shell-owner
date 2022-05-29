// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;

import "../shell/ShellOwnable.sol";

// I FOLLOW LEADER, `shellOwner` will be the leader's address
contract GroupFollower is ShellOwnable {
    constructor(address shellOwner) ShellOwnable(shellOwner) {
    }

    /// @notice Only the owner of `shellOwner` is allowed.
    function withdraw() external {
        _onlyOwner();
        payable(msg.sender).transfer(address(this).balance);
    }
}