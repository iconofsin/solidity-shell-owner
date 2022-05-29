import { BigNumber } from "ethers"
import { ethers, network } from "hardhat"

export const snapshot = async () => {
    const snapshotId = await ethers.provider.send("evm_snapshot", [])
    await ethers.provider.send("evm_mine", [])
    return snapshotId
}

export const rewind = async (snapshotId: string) => {
    await ethers.provider.send("evm_revert", [snapshotId]);
    return ethers.provider.send("evm_mine", [])
}