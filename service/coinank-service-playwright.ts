import { EExchangeName, EInterval, TCoinRequest, TLiquidationMapRequest, TLiquidationMapResponse } from '../models/heatmap';
import { getApiKeyFromCoinAnk, handleResponseCoinank } from '../src/utils/coinank-apikey';

export class CoinankService {
  private apiKey: string;
  constructor() {
    this.apiKey = "";
  }

  async initializeApiKey() {
    const apiKey = await getApiKeyFromCoinAnk();
    if (apiKey) {
      this.apiKey = apiKey;
    }
  }

  async getLiquidationHeatmap(coinRequest: TCoinRequest) {
    console.log("this.apiKey", this.apiKey);
    const response = await handleResponseCoinank(this.apiKey, "/liqMap/getLiqHeatMap", coinRequest);
    return response;
  }

  async getLiquidationMap(coinRequest: TLiquidationMapRequest) {
    const response = await handleResponseCoinank(this.apiKey, "/liqMap/getLiqMap", coinRequest);
    return response;
  }
}

const coinankService = new CoinankService();

async function main() {
  await coinankService.initializeApiKey();
  const response = await coinankService.getLiquidationHeatmap({
    symbol: "BTCUSDT",
    interval: EInterval['12h'],
    exchangeName: EExchangeName.Binance
  });
  console.log(response);
}

main(); 