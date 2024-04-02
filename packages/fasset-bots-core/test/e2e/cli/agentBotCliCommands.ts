import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import spies from "chai-spies";
import { AgentBotCommands } from "../../../src/commands/AgentBotCommands";
import { loadAgentSettings } from "../../../src/config/AgentVaultInitSettings";
import { requireEnv } from "../../../src/utils";
import { initWeb3 } from "../../../src/utils/web3";
import { DEFAULT_POOL_TOKEN_SUFFIX } from "../../../test-hardhat/test-utils/helpers";
import { COSTON_RPC, COSTON_TEST_AGENT_SETTINGS } from "../../test-utils/test-bot-config";
import { enableSlowTests, getNativeAccountsFromEnv, itIf } from "../../test-utils/test-helpers";
use(chaiAsPromised);
use(spies);

const fassetBotConfig: string = requireEnv("FASSET_BOT_CONFIG");
const fAssetSymbol = "FtestXRP";

describe("AgentBot cli commands unit tests", () => {
    let accounts: string[];
    let ownerAddress: string;

    before(async () => {
        accounts = await initWeb3(COSTON_RPC, getNativeAccountsFromEnv(), null);
        ownerAddress = accounts[0];
    });

    it("Should initialize bot cli commands", async () => {
        const botCliCommands = await AgentBotCommands.create(fassetBotConfig, fAssetSymbol);
        expect(botCliCommands.notifiers).to.not.be.null;
        expect(botCliCommands.orm).to.not.be.null;
        expect(botCliCommands.context).to.not.be.null;
        expect(botCliCommands.owner).to.not.be.null;
    });

    itIf(enableSlowTests())("Should create agent bot via bot cli commands", async () => {
        const botCliCommands = await AgentBotCommands.create(fassetBotConfig, fAssetSymbol);
        const agentSettings = loadAgentSettings(COSTON_TEST_AGENT_SETTINGS);
        agentSettings.poolTokenSuffix = DEFAULT_POOL_TOKEN_SUFFIX();
        const agent = await botCliCommands.createAgentVault(agentSettings);
        expect(agent!.underlyingAddress).is.not.null;
        expect(agent!.owner.workAddress).to.eq(ownerAddress);
        // sort of clean up
        await agent!.announceDestroy();
    });

    it("Should not create  bot cli commands - invalid 'fAssetSymbol'", async () => {
        await expect(AgentBotCommands.create(fassetBotConfig, "invalidSymbol")).to.eventually.be.rejectedWith(`Invalid FAsset symbol`).and.be.an.instanceOf(Error);
    });

    it("Should create underlying account", async () => {
        const botCliCommands = await AgentBotCommands.create(fassetBotConfig, fAssetSymbol);
        const data = await botCliCommands.createUnderlyingAccount();
        console.log("test generated address (not used anywhere):", data);
        expect(data.address).to.not.be.null;
        expect(data.privateKey).to.not.be.null;
    });
});
