// This line tells Truffle to load the SupplyChain contract definition.
// It's created by Truffle when you compile the Solidity file.
const SupplyChain = artifacts.require("SupplyChain");

// This exports a function that takes 'deployer' as an argument.
// The 'deployer' object is provided by Truffle and is used to
// deploy contracts to the network.
module.exports = function(deployer) {
    // This command tells Truffle to deploy the SupplyChain contract.
    deployer.deploy(SupplyChain);
};