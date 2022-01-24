'use strict'

const rpcDaemon = require('@arqma/arqma-rpc').RPCDaemon
const fs = require('fs')

// Choose the steps
const step = 500

// Output format for https://github.com/arqma/arqma/blob/master/src/checkpoints/checkpoints.cpp#L173
// ADD_CHECKPOINT(0, "60077b4d5cd49a1278d448c58b6854993d127fcaedbdeab82acff7f7fd86e328");

async function getData () {
  try {
    const daemonClient = rpcDaemon.createDaemonClient({
      url: 'http://127.0.0.1:11112/'
    })
    // When using a self signed certificate with HTTPS you need to set the function sslRejectUnauthorized to false.
    daemonClient.sslRejectUnauthorized(false)

    const writeStream = fs.createWriteStream('checkpoints.txt')

    // get actual blockchain height
    const info = await daemonClient.getInfo()
    const height = info.height
    const cumulative = info.hash
    // Loop in steps to get block_hash
    for (var i = 0; i < height; i += step) {
      const block = await daemonClient.getBlockHeaderByHeight({ height: i })
    const cum = await daemonClient.getBlockHeaderByHeight({ height: i , cumulative_difficulty: i})
      writeStream.write(ADD_CHECKPOINT2(${i}, "${block.block_header.hash}", "0x${cum.block_header.cumulative_difficulty.toString(16)}");\n, 'utf8')
      console.log(ADD_CHECKPOINT(${i}, "${block.block_header.hash}");)

    }
    writeStream.end()
  } catch (error) {
    console.error(error)
  }
}

getData()
