import { ethers } from "hardhat";
import { GroupMember1, GroupMember2, SPVOwner } from "../typechain-types"
import { GroupMember1__factory } from "../typechain-types";
import { GroupMember2__factory } from "../typechain-types";
import { SPVOwner__factory } from "../typechain-types";
import { GroupLeader } from "../typechain-types/leader/GroupLeader"
import { GroupLeader__factory } from "../typechain-types/factories/leader/GroupLeader__factory"
import { GroupFollower } from "../typechain-types/leader/GroupFollower"
import { GroupFollower__factory } from "../typechain-types/factories/leader/GroupFollower__factory"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { providers, Contract, ContractFactory, Signer } from 'ethers'

interface NothingBurgerDeploymentProps {
    deployer: SignerWithAddress | providers.JsonRpcSigner;
}

interface SPVOwnerDeploymentProps extends NothingBurgerDeploymentProps { }
interface GroupLeaderDeploymentProps extends NothingBurgerDeploymentProps { }

interface ShellReferenceDeploymentProps {
    deployer: SignerWithAddress | providers.JsonRpcSigner;
    shell: string;
}

interface GroupMemberDeploymentProps extends ShellReferenceDeploymentProps { }

export const deploySPVOwner =
    async (deployProps: SPVOwnerDeploymentProps): Promise<SPVOwner> => {
        const spvFactory =
            (await ethers.getContractFactory('SPVOwner', deployProps.deployer)) as SPVOwner__factory

        const spv = await spvFactory.deploy()

        await spv.deployed()

        return spv
    }

export const deployGroupMember1 =
    async (deployProps: GroupMemberDeploymentProps): Promise<GroupMember1> => {
        const gm1Factory =
            (await ethers.getContractFactory('GroupMember1', deployProps.deployer)) as GroupMember1__factory

        const gm1 = await gm1Factory.deploy(deployProps.shell)

        await gm1.deployed()

        return gm1
    }

export const deployGroupMember2 =
    async (deployProps: GroupMemberDeploymentProps): Promise<GroupMember2> => {
        const gm2Factory =
            (await ethers.getContractFactory('GroupMember2', deployProps.deployer)) as GroupMember2__factory

        const gm2 = await gm2Factory.deploy(deployProps.shell)

        await gm2.deployed()

        return gm2
    }

export const deployGroupFollower =
    async (deployProps: GroupMemberDeploymentProps): Promise<GroupFollower> => {
        const gfFactory =
            (await ethers.getContractFactory('GroupFollower', deployProps.deployer)) as GroupFollower__factory

        const gf = await gfFactory.deploy(deployProps.shell)

        await gf.deployed()

        return gf
    }

export const deployGroupLeader =
    async (deployProps: GroupLeaderDeploymentProps): Promise<GroupLeader> => {
        const glFactory =
            (await ethers.getContractFactory('GroupLeader', deployProps.deployer)) as GroupLeader__factory

        const gl = await glFactory.deploy()

        await gl.deployed()

        return gl
    }