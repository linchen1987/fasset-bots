import "dotenv/config";
import "source-map-support/register";

import { ActorBaseKind, ActorBaseRunner } from "@flarelabs/fasset-bots-core";
import { closeBotConfig, createBotConfig, getSecrets, loadConfigFile, requireSecret } from "@flarelabs/fasset-bots-core/config";
import { authenticatedHttpProvider, initWeb3 } from "@flarelabs/fasset-bots-core/utils";
import { programWithCommonOptions } from "../utils/program";
import { toplevelRun } from "../utils/toplevel";

const program = programWithCommonOptions("bot", "all_fassets");

program.action(async () => {
    const options: { config: string } = program.opts();
    const runConfig = loadConfigFile(options.config);
    const liquidatorAddress: string = requireSecret("liquidator.address");
    const liquidatorPrivateKey: string = requireSecret("liquidator.private_key");
    await initWeb3(authenticatedHttpProvider(runConfig.rpcUrl, getSecrets().apiKey.native_rpc), [liquidatorPrivateKey], null);
    const config = await createBotConfig(runConfig, liquidatorAddress);
    const fassetList = Array.from(config.fAssets.values());
    const runners = await Promise.all(fassetList.map(
        (chainConfig) => ActorBaseRunner.create(config, liquidatorAddress, ActorBaseKind.LIQUIDATOR, chainConfig)
    ));
    // run
    try {
        console.log("Liquidator bot started, press CTRL+C to end");
        process.on("SIGINT", () => {
            console.log("Liquidator bot stopping...");
            runners.forEach(runner => runner.requestStop());
        });
        await Promise.allSettled(runners.map(
            runner => runner.run(ActorBaseKind.LIQUIDATOR))
        );
    } finally {
        await closeBotConfig(config);
    }
    console.log("Liquidator bot stopped");
});

toplevelRun(async () => {
    await program.parseAsync();
});
