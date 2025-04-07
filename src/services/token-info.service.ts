import axios from "axios";
import { BUBBLE_MAP_SOLANA_ADDRESS_API, RUG_CHECK_SOLANA_API, SOLANA_TOKEN_INFO_API } from "../constants";

class TokenInfoService {
  async getTokenInfo(tokenAddress: string) {
    const response = await axios.get(`${RUG_CHECK_SOLANA_API}/tokens/${tokenAddress}/report`);
    return response.data;
  }

  async getPriceSolanaToken(tokenAddress: string) {
    const response = await axios.get(`${SOLANA_TOKEN_INFO_API}/tokens/${tokenAddress}/price`);
    return response.data;
  }

  async getBubbleMap(tokenAddress: string, chain: string) {
    const response = await axios.get(`${BUBBLE_MAP_SOLANA_ADDRESS_API}/get-bubble-graph-data?token=${tokenAddress}&chain=${chain}`);
    return response.data;
  }
}

const tokenInfoService = new TokenInfoService();
export default tokenInfoService;