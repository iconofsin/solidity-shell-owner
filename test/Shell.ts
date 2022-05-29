import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { deploySPVOwner, deployGroupLeader, deployGroupFollower, deployGroupMember1, deployGroupMember2 } from './utils';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers, network } from 'hardhat'
import { rewind, snapshot } from './etherslib';
import { errors } from './errors';
import { SPVOwner } from '../typechain-types';
import { GroupMember1, GroupMember2 } from '../typechain-types/spv';
import { GroupLeader } from '../typechain-types/leader/GroupLeader';
import { GroupFollower } from '../typechain-types/leader/GroupFollower';

chai.use(solidity)
const { expect } = chai

let snapshotId: string

describe('Shell Ownership', () => {
    let deployerSPV: SignerWithAddress
    let deployerLeaderOfGroup: SignerWithAddress
    let whateverEOA1: SignerWithAddress
    let whateverEOA2: SignerWithAddress
    let spv: SPVOwner
    let gm1: GroupMember1
    let gm2: GroupMember2
    let leader: GroupLeader
    let follower: GroupFollower

    before(async () => {
        [deployerSPV, deployerLeaderOfGroup, whateverEOA1, whateverEOA2] = await ethers.getSigners()

        spv = await deploySPVOwner({ deployer: deployerSPV })
        gm1 = await deployGroupMember1({ deployer: deployerSPV, shell: spv.address })
        gm2 = await deployGroupMember2({ deployer: deployerSPV, shell: spv.address })

        leader = await deployGroupLeader({ deployer: deployerLeaderOfGroup })
        follower = await deployGroupFollower({ deployer: deployerLeaderOfGroup, shell: leader.address })
    })

    describe('deployerSPV is the owner of all contracts', () => {
        it('...owns the Shell', async () => {
            expect(await spv.owner()).to.equal(deployerSPV.address)
        })
        it('...owns Group Member 1', async () => {
            expect(await gm1.owner()).to.equal(deployerSPV.address)
        })
        it('...owns Group Member 2', async () => {
            expect(await gm2.owner()).to.equal(deployerSPV.address)
        })
        it('...is capable of calling group members\' owner-only functions', async () => {
            await gm1.connect(deployerSPV).withdraw()
            await gm2.connect(deployerSPV).withdraw()
        })
        it('...but someone like EOA1 is not', async() => {
            await expect(gm1.connect(whateverEOA1).withdraw()).to.be.revertedWith(errors.Unauthorized)
            await expect(gm2.connect(whateverEOA1).withdraw()).to.be.revertedWith(errors.Unauthorized)
        })
    })

    describe('deployerLeaderOfGroup is the owner of all contracts', () => {
        it('...owns the Leader', async () => {
            expect(await leader.owner()).to.equal(deployerLeaderOfGroup.address)
        })
        it('...owns the Follower', async () => {
            expect(await follower.owner()).to.equal(deployerLeaderOfGroup.address)
        })
        it('...is capable of calling owner-only functions', async () => {
            await leader.connect(deployerLeaderOfGroup).withdraw()
            await follower.connect(deployerLeaderOfGroup).withdraw()
        })
        it('...but someone like EOA2 is not', async() => {
            await expect(leader.connect(whateverEOA2).withdraw()).to.be.revertedWith(errors.Unauthorized)
            await expect(follower.connect(whateverEOA2).withdraw()).to.be.revertedWith(errors.Unauthorized)
        })
    })

    describe('SPV: group ownership transfer', () => {
        it('...transferring ownership of the Shell to EOA1', async () => {
            await spv.transferOwnership(whateverEOA1.address)
        })
        it('...makes EOA1 the owner of the Shell', async () => {
            expect(await spv.owner()).to.equal(whateverEOA1.address)
        })
        it('...makes EOA1 the owner of Group Member 1', async () => {
            expect(await gm1.owner()).to.equal(whateverEOA1.address)
        })
        it('...makes EOA1 the owner of Group Member 2', async () => {
            expect(await gm2.owner()).to.equal(whateverEOA1.address)
        })
        it('...now the OG owner can no longer use owner-only functions', async () => {
            await expect(gm1.connect(deployerSPV).withdraw()).to.be.revertedWith(errors.Unauthorized)
            await expect(gm2.connect(deployerSPV).withdraw()).to.be.revertedWith(errors.Unauthorized)
        })
        it('...but the new owner, EOA1, can', async() => {
            await gm1.connect(whateverEOA1).withdraw()
            await gm2.connect(whateverEOA1).withdraw()
        })
    })

    describe('Leader: group ownership transfer', () => {
        it('...transferring ownership of the Leader to EOA2', async () => {
            await leader.transferOwnership(whateverEOA2.address)
        })
        it('...makes EOA2 the owner of the Leader', async () => {
            expect(await leader.owner()).to.equal(whateverEOA2.address)
        })
        it('...makes EOA2 the owner of the Follower', async () => {
            expect(await follower.owner()).to.equal(whateverEOA2.address)
        })
        it('...the OG owner is no longer capable of calling owner-only functions', async () => {
            await expect(leader.connect(deployerLeaderOfGroup).withdraw()).to.be.revertedWith(errors.Unauthorized)
            await expect(follower.connect(deployerLeaderOfGroup).withdraw()).to.be.revertedWith(errors.Unauthorized)

        })
        it('...but the new owner, EOA2, can', async() => {
            await leader.connect(whateverEOA2).withdraw()
            await follower.connect(whateverEOA2).withdraw()
        })
    })
})

