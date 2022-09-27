const { run } = rquire("hardhat")

const verify = async (contractAddress, args) => {
    console.log("Verifying Contract...")
    try {
        await run("verify:verify", {
            contractAddress,
            contructorAguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

module.exports = { verify }
