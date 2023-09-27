import { IAssetActorContext } from "../../src/fasset-bots/IAssetBotContext";
import { MockChainWallet } from "../../src/mock/MockChain";
import { InitialAgentData } from "../../src/state/TrackedAgentState";
import { TrackedState } from "../../src/state/TrackedState";
import { toBN } from "../../src/utils/helpers";
import { FuzzingStateAgent } from "./FuzzingStateAgent";

export class FuzzingState extends TrackedState {
    constructor(
        public context: IAssetActorContext,
        lastEventBlockHandled: number,
        public wallet: MockChainWallet
    ) {
        super(context, lastEventBlockHandled);
    }

    fAssetBalance = toBN(0);

    override agents!: Map<string, FuzzingStateAgent>;
    override agentsByUnderlying!: Map<string, FuzzingStateAgent>;
    override agentsByPool!: Map<string, FuzzingStateAgent>;

    override getAgent(address: string): FuzzingStateAgent | undefined {
        return this.agents.get(address);
    }

    protected override newAgent(data: InitialAgentData): FuzzingStateAgent {
        return new FuzzingStateAgent(this, data, this.wallet);
    }

    get fAssetTotalBalance(): BN {
        //TODO
        return toBN(0);
    }
}
