import { TFireantFinancialStatementQuery, TFireantHistoryPriceQuery, TFireantPostQuery } from "../types";
import { getApiKeyFromFireant, handleResponseFireant } from "../utils";

export class FireantService {
  private fireantApiKey: string;
  constructor() {
    this.fireantApiKey = "";
  }

  async initializeApiKey() {
    const apiKey = await getApiKeyFromFireant();
    if (apiKey) {
      this.fireantApiKey = apiKey;
    }
  }

  async getListOfficialPostVnStock(query: TFireantPostQuery) {
    const response = await handleResponseFireant(this.fireantApiKey, `/posts?type=1`, query);
    return response;
  }

  async getListUserPostVnStock(query: TFireantPostQuery) {
    const response = await handleResponseFireant(this.fireantApiKey, `/posts?type=0`, query);
    return response;
  }

  // get information of each ticker
  async getFundamentalAnalysisTickerVnStock(symbol: string) {
    const response = await handleResponseFireant(this.fireantApiKey, `/symbols/${symbol}/fundamental`, {});
    return response;
  }

  async getProfileVnStock(symbol: string) {
    const response = await handleResponseFireant(this.fireantApiKey, `/symbols/${symbol}/profile`, {});
    return response;
  }

  async getHolderofTickerVnStock(symbol: string) {
    const response = await handleResponseFireant(this.fireantApiKey, `/symbols/${symbol}/holders`, {});
    return response;
  }

  async getHistoryPriceVnStock(query: TFireantHistoryPriceQuery) {
    const response = await handleResponseFireant(this.fireantApiKey, `/symbols/${query.symbol}/historical-quotes`, query);
    return response;
  }

  async getFinancialStatementVnStock(query: TFireantFinancialStatementQuery) {
    const response = await handleResponseFireant(this.fireantApiKey, `/symbols/${query.symbol}/financial-data`, query);
    return response;
  }
}


const fireantService = new FireantService();
export default fireantService;
// (async () => {
//   await fireantService.initializeApiKey();
//   const data = await fireantService.getHistoryPriceVnStock({
//     symbol: "VNINDEX",
//   });
//   console.log(data);
// })();