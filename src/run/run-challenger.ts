import "dotenv/config";

import { readFileSync } from "fs";
import { requireEnv, toplevelRun } from "../utils/helpers";
import { initWeb3 } from "../utils/web3";
import { ActorBaseKind } from "../fasset-bots/ActorBase";
import { ActorBaseRunner } from "../actors/ActorBaseRunner";
import { disableMccTraceManager } from "../../test-hardhat/test-utils/helpers";
import { BotConfigFile, createBotConfig } from "../config/BotConfig";

const CHALLENGER_ADDRESS: string = requireEnv("NATIVE_ACCOUNT1");
const CHALLENGER_PRIVATE_KEY: string = requireEnv("NATIVE_ACCOUNT1_PRIVATE_KEY");
const RUN_CONFIG_PATH: string = "./run-config/run-config-challenger-coston-testxrp.json";
const fAssetSymbol = "FtestXRP";

toplevelRun(async () => {
    // to avoid RangeError: Map maximum size exceeded in /home/fasset-bots/simple-wallet/node_modules/@flarenetwork/mcc/dist/src/utils/trace.js:18:44
    disableMccTraceManager();
    const runConfig = JSON.parse(readFileSync(RUN_CONFIG_PATH).toString()) as BotConfigFile;
    await initWeb3(runConfig.rpcUrl, [CHALLENGER_PRIVATE_KEY], null);
    const config = await createBotConfig(runConfig, CHALLENGER_ADDRESS);
    const chainConfig = config.fAssets.find((cc) => cc.fAssetSymbol === fAssetSymbol);
    if (chainConfig == null) {
        console.log(`Invalid FAsset symbol ${fAssetSymbol}`);
        throw Error(`Invalid FAsset symbol ${fAssetSymbol}`);
    }
    const runner = await ActorBaseRunner.create(config, CHALLENGER_ADDRESS, ActorBaseKind.CHALLENGER, chainConfig);
    // run
    console.log("Challenger bot started, press CTRL+C to end");
    process.on("SIGINT", () => {
        runner.requestStop();
    });
    await runner.run(ActorBaseKind.CHALLENGER);
    console.log("Challenger bot stopped");
});
