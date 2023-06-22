import { TimeLock } from './../typechain-types/contracts/Governance_standard/TImelock.sol/TimeLock';
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { ADDRESS_ZERO } from './../hardhat-helper-configs';


const deployBox: DeployFunction = async(
  hre: HardhatRuntimeEnvironment
  ) => {
    const {getNamedAccounts, deployments, network} = hre;
    const {deployer} = await getNamedAccounts();
    const {deploy, log, get} = deployments;

    log("Deploy the Box Contract ...");

    const box = await deploy("Box", {
      from: deployer,
      args: [],
      log: true,
    });

    const boxContract = await ethers.getContractAt("Box", box.address);
    const timeLock = await ethers.getContract("TimeLock");

    const transferTx = await boxContract.transferOwnership(timeLock.address);
    await transferTx.wait(1);

    log(`Ownership of 'Box' contract it's transferred to 'Timelock'`);
  };

  export default deployBox;
  deployBox.tags = ["all","box"];