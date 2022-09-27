// imports
// main function
// calling of main function

const { network } = require("hardhat")

// function deployFunc(hre) {
//     console.log("HI!")
// }

// module.exports.default = deployFunc

// anonymous async function instead

// module.exports = async (hru) => {
//     const { getNamedAccounts, deployments } = hre
// }

const {
    networkConfig,
    developementChains,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    if (developementChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // if the contract doesn't exist, we deploy a minimal version for our local testing

    // well what happens when we want to change chains?
    // when going for localhost or hardhat network we want to use a mock
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], // put price feed address
        log: true,
    })

    log("----------------------------------------------")
}
module.exports.tags = ["all", "fundme"]
