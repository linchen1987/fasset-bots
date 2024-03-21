import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AgentService } from "../services/agent.service";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ApiResponseWrapper, handleApiResponse } from "../../common/ApiResponse";
import { AgentCreateResponse, AgentSettings } from "../../common/AgentResponse";
import { AgentSettingsConfig } from "@flarelabs/fasset-bots-core/config";
import { PostAlert } from "../../../../../fasset-bots-core/src/utils/notifier/NotifierTransports";

@ApiTags("Agent")
@Controller("api/agent")
@UseGuards(AuthGuard("api-key"))
@ApiSecurity("X-API-KEY")
export class AgentController {
    constructor(private readonly agentService: AgentService) {}

    @Post("create/:fAssetSymbol")
    public async create(
        @Param("fAssetSymbol") fAssetSymbol: string,
        @Body() agentSettings: AgentSettingsConfig
    ): Promise<ApiResponseWrapper<AgentCreateResponse | null>> {
        return handleApiResponse(this.agentService.createAgent(fAssetSymbol, agentSettings));
    }

    @Post("available/enter/:fAssetSymbol/:agentVaultAddress")
    @HttpCode(200)
    public async enter(@Param("fAssetSymbol") fAssetSymbol: string, @Param("agentVaultAddress") agentVaultAddress: string): Promise<ApiResponseWrapper<void>> {
        return handleApiResponse(this.agentService.enterAvailable(fAssetSymbol, agentVaultAddress));
    }

    @Post("available/announceExit/:fAssetSymbol/:agentVaultAddress")
    @HttpCode(200)
    public async announceExit(
        @Param("fAssetSymbol") fAssetSymbol: string,
        @Param("agentVaultAddress") agentVaultAddress: string
    ): Promise<ApiResponseWrapper<void>> {
        return handleApiResponse(this.agentService.announceExitAvailable(fAssetSymbol, agentVaultAddress));
    }

    @Post("available/exit/:fAssetSymbol/:agentVaultAddress")
    @HttpCode(200)
    public async exit(@Param("fAssetSymbol") fAssetSymbol: string, @Param("agentVaultAddress") agentVaultAddress: string): Promise<ApiResponseWrapper<void>> {
        return handleApiResponse(this.agentService.exitAvailable(fAssetSymbol, agentVaultAddress));
    }

    @Post("selfClose/:fAssetSymbol/:agentVaultAddress/:amountUBA")
    @HttpCode(200)
    public async selfClose(
        @Param("fAssetSymbol") fAssetSymbol: string,
        @Param("agentVaultAddress") agentVaultAddress: string,
        @Param("amountUBA") amountUBA: string
    ): Promise<ApiResponseWrapper<void>> {
        return handleApiResponse(this.agentService.selfClose(fAssetSymbol, agentVaultAddress, amountUBA));
    }

    @Get("settings/list/:fAssetSymbol/:agentVaultAddress")
    @HttpCode(200)
    public async getAgentSetting(
        @Param("fAssetSymbol") fAssetSymbol: string,
        @Param("agentVaultAddress") agentVaultAddress: string
    ): Promise<ApiResponseWrapper<AgentSettings>> {
        return handleApiResponse(this.agentService.listAgentSetting(fAssetSymbol, agentVaultAddress));
    }

    @Post("settings/update/:fAssetSymbol/:agentVaultAddress/:settingName/:settingValue")
    @HttpCode(200)
    public async updateAgentSetting(
        @Param("fAssetSymbol") fAssetSymbol: string,
        @Param("agentVaultAddress") agentVaultAddress: string,
        @Param("settingName") settingName: string,
        @Param("settingValue") settingValue: string
    ): Promise<ApiResponseWrapper<void>> {
        return handleApiResponse(this.agentService.updateAgentSetting(fAssetSymbol, agentVaultAddress, settingName, settingValue));
    }

    @Post("botAlert")
    @HttpCode(200)
    public async sendNotification(
        @Body() notification: PostAlert
    ): Promise<ApiResponseWrapper<void>> {
        return handleApiResponse(this.agentService.saveNotification(notification));
    }

    @Get("botAlert")
    @HttpCode(200)
    public async getNotifications(
    ): Promise<ApiResponseWrapper<PostAlert[]>> {
        return handleApiResponse(this.agentService.getNotifications());
    }

    @Get("workAddress")
    @HttpCode(200)
    public async getAgentWorkAddress(
    ): Promise<ApiResponseWrapper<string>> {
        return handleApiResponse(this.agentService.getAgentWorkAddress());
    }
}
