import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { MIN_DELAY, PROPOSERS, EXECUTORS } from "../hardhat-helper-configs";


const deployTimeLock: DeployFunction = async(
  hre: HardhatRuntimeEnvironment
  ) => {
    const {getNamedAccounts, deployments, network} = hre;
    const {deployer} = await getNamedAccounts();
    const {deploy, log} = deployments;

    log("Deploying the TimeLock contact ... ");
    
    const timelock = await deploy("TimeLock", {
      from: deployer,
      args: [MIN_DELAY, PROPOSERS, EXECUTORS],
      log: true,
    });

    log(`02 - 'TimeLock' contract deployed at ${timelock.address}`)
  };

  export default deployTimeLock;
  deployTimeLock.tags = ("all","timeLock");