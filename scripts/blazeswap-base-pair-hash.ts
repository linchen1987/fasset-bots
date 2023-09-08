import { keccak256 } from '@ethersproject/keccak256'

// blaze swap hardcodes the bytecode hash of the base pair contract to deploy it with deterministic address
// importing blazeswap makes weird things happen and this is how to get the correct hash

const BlazeSwapBasePair = require('../artifacts/blazeswap/contracts/core/BlazeSwapBasePair.sol/BlazeSwapBasePair.json')
const hash = keccak256(BlazeSwapBasePair.bytecode).slice(2)
console.log(hash)