import "dotenv/config";
import "source-map-support/register";

import { SourceId } from "@flarelabs/fasset-bots-core";
import { Secrets, createBlockchainWalletHelper, loadAgentConfigFile, overrideAndCreateOrm } from "@flarelabs/fasset-bots-core/config";
import { CommandLineError } from "@flarelabs/fasset-bots-core/utils";
import chalk from "chalk";
import { programWithCommonOptions } from "../utils/program";
import { toplevelRun } from "../utils/toplevel";

const program = programWithCommonOptions("bot", "single_fasset");

program.name("utils").description("Command line blockchain helpers");

program
    .command("addTransaction")
    .description("add underlying transaction")
    .argument("<from>", "source address")
    .argument("<to>", "destination address")
    .argument("<amount>", "amount to send")
    .argument("[reference]", "payment reference")
    .action(async (from: string, to: string, amount: string, reference: string | null) => {
        const options: { fasset: string } = program.opts();
        const wallet = await setupContext(options.fasset);
        const tx = await wallet.addTransaction(from, to, amount, reference);
        console.log(tx);
    });

toplevelRun(async () => {
    await program.parseAsync();
});

async function setupContext(fAssetSymbol: string) {
    console.log(chalk.cyan("Initializing wallet..."));
    const options: { config: string; secrets: string } = program.opts();
    const secrets = Secrets.load(options.secrets);
    const runConfig = loadAgentConfigFile(options.config);
    if (!runConfig.ormOptions) {
        throw new CommandLineError("Missing ormOptions in runConfig");
    }
    const orm = await overrideAndCreateOrm(runConfig.ormOptions, secrets.data.database);
    const chainConfig = runConfig.fAssets[fAssetSymbol];
    if (chainConfig == null) {
        throw new CommandLineError("Invalid FAsset symbol");
    }
    if (!chainConfig.walletUrl) {
        throw new CommandLineError("Missing wallet url");
    }
    const sourceId = SourceId.fromChainName(chainConfig.chainId);
    const walletHelper = createBlockchainWalletHelper("agent", secrets, sourceId, orm.em, chainConfig.walletUrl, runConfig.walletOptions);
    console.log(chalk.cyan("Wallet initialized."));
    return walletHelper;
}
