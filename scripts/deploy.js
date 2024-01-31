const hre = require("hardhat");

const tokens = (nToken) => {
  return ethers.utils.parseUnits(nToken.toString(), "ether");
};

async function main() {
  //Total Supply TokenSLV
  const _initialSupply = tokens(5000000);

  const TokenSLV = await hre.ethers.getContractFactory(
    "TokenSLV"
  );
  const tokenSLV = await TokenSLV.deploy(_initialSupply);

  await tokenSLV.deployed();
  console.log(` TokenSLV: ${tokenSLV.address}`);


  //TOKEN SALE
  const _tokenPrice = tokens(1);

  const TokenSale = await hre.ethers.getContractFactory("TokenSale");
  const tokenSale = await TokenSale.deploy(
    tokenSLV.address,
    _tokenPrice
  );

  await tokenSale.deployed();
  console.log(` TokenSale: ${tokenSale.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
