import { GovernanceToken } from './../typechain-types/contracts/Governance_standard/GovernanceToken';
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { MIN_DELAY, PROPOSERS, EXECUTORS, VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE } from "../hardhat-helper-configs";


const deployGovernorContract: DeployFunction = async(
  hre: HardhatRuntimeEnvironment
  ) => {
    const {getNamedAccounts, deployments, network} = hre;
    const {deployer} = await getNamedAccounts();
    const {deploy, log, get} = deployments;

    const governanceToken = await get("GovernanceToken");
    const timeLock = await get("TimeLock");

    const governorContact = await deploy("GovernorContract",{
      from: deployer,
      args: [
        governanceToken.address,
        timeLock.address,
        ],
      log: true,
    });

    log(`03 - 'GovernorContract' deployed at ${governorContact.address}`)
  };

  export default deployGovernorContract;
  deployGovernorContract.tags = ["all","governor"];