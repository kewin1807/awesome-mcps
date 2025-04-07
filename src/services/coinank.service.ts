import axios from "axios";
import { TAddress, TAggregateLiquidationRequest, TBaseQuery, THeatMapRequest, TLiquidationMapRequest } from "../types";
import { getApiKeyFromCoinAnk, handleResponseCoinank } from "../utils";
import { MAINNET_HYPERLIQUID_API } from "../constants";

export class CoinankService {
  private coinAnkApiKey: string;
  constructor() {
    this.coinAnkApiKey = "";
  }

  async initializeApiKey() {
    const apiKey = await getApiKeyFromCoinAnk();
    if (apiKey) {
      this.coinAnkApiKey = apiKey;
    }
  }

  async getLiquidationHeatmap(coinRequest: THeatMapRequest) {
    const response = await handleResponseCoinank(this.coinAnkApiKey, "/liqMap/getLiqHeatMap", coinRequest);
    return response;
  }

  async getLiquidationSymbol() {
    const response = await handleResponseCoinank(this.coinAnkApiKey, "/liqMap/getLiqHeatMapSymbol", {});
    return response;
  }

  async getLiquidationMap(request: TLiquidationMapRequest) {
    const response = await handleResponseCoinank(this.coinAnkApiKey, "/liqMap/getLiqMap", request);
    return response;
  }

  async getAggregateLiquidation(request: TAggregateLiquidationRequest) {
    const response = await handleResponseCoinank(this.coinAnkApiKey, "/liqMap/getAggLiqMap", request);
    return response;
  }

  async getRealtimeLongshortRatio() {
    const response = await handleResponseCoinank(this.coinAnkApiKey, "/hyper/longshortRatio", {});
    return response;
  }



  // hyperliquid tracker
  async getLatestWhaleActions() {
    const response = await handleResponseCoinank(this.coinAnkApiKey, "/hyper/topAction", {});
    return response;
  }

  async getStatisticWhalePnl() {
    const response = await handleResponseCoinank(this.coinAnkApiKey, "/hyper/statistic", {});
    return response;
  }

  async getWhalePositions(params: TBaseQuery) {
    const response = await handleResponseCoinank(this.coinAnkApiKey, "/hyper/topPosition", params);
    return response;
  }

  async getTotalPnlByAddress(params: TAddress) {
    const response = await handleResponseCoinank(this.coinAnkApiKey, "/hyper/getUserPortfolio", params);
    return response;
  }

  async getCurrentHyperLiquidPosition(address: string) {
    try {
      const response = await axios.post(MAINNET_HYPERLIQUID_API, {
        type: "clearinghouseState",
        user: address
      },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return {
        success: true,
        message: "Current hyperliquid position fetched successfully",
        data: response.data
      };
    }
    catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to get current hyperliquid position",
        data: null
      };
    }
  }

  async getHyperLiquidPositionHistory(address: string) {
    try {
      const response = await axios.post(MAINNET_HYPERLIQUID_API, {
        type: "userFills",
        user: address
      },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return {
        success: true,
        message: "Hyperliquid position history fetched successfully",
        data: response.data
      };
    }
    catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Failed to get hyperliquid position history",
        data: null
      };
    }
  }
}
const coinankService = new CoinankService();
export default coinankService;
// async function main() {
//   const startTime = new Date();
//   await coinankService.initializeApiKey();
//   const response = await coinankService.getLiquidationHeatmap({
//     symbol: "BTCUSDT",
//     interval: "12h",
//     exchangeName: "Binance"
//   });
//   const endTime = new Date();
//   console.log(response);
//   console.log(`Time taken: ${endTime.getTime() - startTime.getTime()}ms`);
// }

// main();