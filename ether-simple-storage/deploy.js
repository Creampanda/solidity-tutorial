const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
  const wallet = new ethers.Wallet(
    "1bfe11225d498904dc4a75084cd2c3e2db2c7844f831de603fbbd66adac48a04",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying...");
  const contract = await contractFactory.deploy();
  console.log(contract);
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log(deploymentReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
