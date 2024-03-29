const address0 = "0x0000000000000000000000000000000000000000";

const one = "1000000000000000000";
const ten = "10000000000000000000";
const oneHundred = "100000000000000000000";
const oneThousand = "1000000000000000000000";
const tenThousand = "10000000000000000000000";
const oneHundredThousand = "100000000000000000000000";
const oneMillion = "1000000000000000000000000";

const oneSecond = "1";
const oneMinute = "60";
const oneHour = "3600";
const oneDay = "86400";
const oneWeek = "604800";
const oneMonth = "2592000";

const minAmount = "1000000000000000000000";
const allowAmnt = "100000000000000000000000000000000000000000000";

const getBalances = async (tokenContract, userAddrArray) => {
  results = [];
  for (let i = 0; i < userAddrArray.length; i++) {
    const result = await tokenContract.balanceOf(userAddrArray[i]);
    results.push(result.toString());
  }
  return results;
};

const getBNBBalance = async (UserObj) => {
  const bnbBal = await UserObj.getBalance();
  return bnbBal;
};

const approve = async (tokenObject, apprvContr, spenderAddr) => {
  await tokenObject.approve(apprvContr, allowAmnt, {
    from: spenderAddr,
  });
};

const deployPool = async (addLiqAmount, PoolFact, tokenAddr) => {
  await PoolFact.createPoolADD(addLiqAmount, addLiqAmount, tokenAddr, {
    value: tokenAddr === address0 ? addLiqAmount : 0,
  });
};

const curatePool = async (PoolFact, tokenAddr) => {
  await PoolFact.addCuratedPool(tokenAddr);
};

const unCuratePool = async (PoolFact, tokenAddr) => {
  await PoolFact.removeCuratedPool(tokenAddr);
};

const deploySynth = async (SynthFact, tokenAddr) => {
  await SynthFact.createSynth(tokenAddr);
};

const listBond = async (BondVault, Token, daoAddress, spenderAddr) => {
  await BondVault.listBondAsset(Token.address);
  await approve(Token, daoAddress, spenderAddr);
};

const mintSpartaForBond = async (Sparta, daoAddress) => {
  await Sparta.mintFromDAO(oneMillion, daoAddress);
};

const deployBatchTokens = async (
  tokenCount,
  namingString,
  spenderAddr,
  apprvContrArray
) => {
  // Deploy token contracts
  const tokenObjects = []; // Array to push deployed token contract objects to
  const tokenArray = []; // TokenArray to push deployed token contract addresses to
  for (let i = 0; i < tokenCount; i++) {
    const _NewToken = await ethers.getContractFactory("Token1");
    const NewToken = await _NewToken.deploy(namingString + i);
    tokenObjects.push(NewToken);
    tokenArray.push(NewToken.address);
  }
  // Do approvals
  for (let i = 0; i < tokenObjects.length; i++) {
    for (let ii = 0; ii < apprvContrArray.length; ii++) {
      await approve(tokenObjects[i], apprvContrArray[ii], spenderAddr);
    }
  }
  return { tokenObjects, tokenArray };
};

const connectToContract = async (contractIdString, contractAddress) => {
  let contract = await ethers.getContractFactory(contractIdString);
  contract = await contract.attach(contractAddress);
  return contract;
};

module.exports = {
  address0,
  minAmount,
  allowAmnt,
  one,
  ten,
  oneHundred,
  oneThousand,
  oneHundredThousand,
  oneMillion,
  oneSecond,
  oneMinute,
  oneHour,
  oneDay,
  oneWeek,
  oneMonth,
  getBalances,
  getBNBBalance,
  deployPool,
  curatePool,
  unCuratePool,
  deploySynth,
  listBond,
  mintSpartaForBond,
  approve,
  deployBatchTokens,
  connectToContract,
};
