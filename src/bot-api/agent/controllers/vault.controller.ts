import { Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { AgentService } from "../services/agent.service";
import { ApiTags } from "@nestjs/swagger";
import { ApiResponseWrapper, handleApiResponse } from "../../common/ApiResponse";
import { AgentBalance } from "../../common/AgentResponse";

@ApiTags("Agent Vault")
@Controller("api/agentVault")
export class AgentVaultController {
    constructor(private readonly agentService: AgentService) {}

    @Post("collateral/deposit/:fAssetSymbol/:agentVaultAddress/:amount")
    @HttpCode(200)
    public async depositVaultCollateral(
        @Param("fAssetSymbol") fAssetSymbol: string,
        @Param("agentVaultAddress") agentVaultAddress: string,
        @Param("amount") amount: string
    ): Promise<ApiResponseWrapper<void>> {
        return handleApiResponse(this.agentService.depositToVault(fAssetSymbol, agentVaultAddress, amount));
    }

    @Post("collateral/withdraw/:fAssetSymbol/:agentVaultAddress/:amount")
    @HttpCode(200)
    public async withdrawVaultCollateral(
        @Param("fAssetSymbol") fAssetSymbol: string,
        @Param("agentVaultAddress") agentVaultAddress: string,
        @Param("amount") amount: string
    ): Promise<ApiResponseWrapper<void>> {
        return handleApiResponse(this.agentService.withdrawVaultCollateral(fAssetSymbol, agentVaultAddress, amount));
    }

    @Get("collateral/freeBalance:fAssetSymbol/:agentVaultAddress")
    public async getFreeVaultCollateral(
        @Param("fAssetSymbol") fAssetSymbol: string,
        @Param("agentVaultAddress") agentVaultAddress: string
    ): Promise<ApiResponseWrapper<AgentBalance>> {
        return handleApiResponse(this.agentService.getFreeVaultCollateral(fAssetSymbol, agentVaultAddress));
    }

    @Post("close/:fAssetSymbol/:agentVaultAddress")
    @HttpCode(200)
    public async closeVault(
        @Param("fAssetSymbol") fAssetSymbol: string,
        @Param("agentVaultAddress") agentVaultAddress: string
    ): Promise<ApiResponseWrapper<void>> {
        return handleApiResponse(this.agentService.closeVault(fAssetSymbol, agentVaultAddress));
    }
}
