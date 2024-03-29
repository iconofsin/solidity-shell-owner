# solidity-shell-owner

Shell Ownership is an orchestration/management pattern applicable to systems of multiple contracts with ownership by single EOA. Changing Shell Owner for a group of contracts only requires one transaction.

The two common use cases are:

1. Designate a minimalistic-ish separate contract as the Shell Ownership vehicle (see `contracts/spv`).
2. Designate one of the contracts in the group as the Shell Ownership vehicle (see `contracts/leader`).

In both cases, the EOA owning the Shell Ownership vehicle contract owns every contract in the group.

The implementations in this repository are POC based on a somewhat gas-optimized Ownable.sol by OpenZeppelin. 
The code has not been audited.

`yarn i`, `yarn build`, and `npx hardhat test` to see it in action.
