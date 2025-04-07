import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { EExchangeName, EFinancialStatementPeriod, EHeatMapInterval, ELiquidationMapInterval } from "./constants/enums";
import coinankService from "./services/coinank.service";
import fireantService from "./services/fireant.service";

const server = new McpServer({
  name: "awesomemcp",
  version: "1.0.0",
});

// coinank tools
server.tool(
  "get_liquidation_heatmap",
  "Get the liquidation heatmap data of a cryptocurrency pair. Provide information about the price levels with a high concentration of liquidation orders, represented as a heatmap.",
  {
    symbol: z.string().describe("The trading pair, e.g: BTCUSDT, ETHUSDT"),
    interval: z.enum(Object.values(EHeatMapInterval) as [string, ...string[]]).describe("The time interval: 12h, 1d, 3d, 1w, 2w, 1m, 3m, 6m, 1y"),
    exchangeName: z.enum(Object.values(EExchangeName) as [string, ...string[]]).describe("The exchange name: Binance, Bybit, Okex")
  },
  async (params) => {

    const data = await coinankService.getLiquidationHeatmap({
      symbol: params.symbol,
      interval: params.interval as EHeatMapInterval,
      exchangeName: params.exchangeName as EExchangeName
    });
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_liquidation_map",
  "Get the liquidation map data of a cryptocurrency pair. Provide detailed information about the liquidation positions by price level.",
  {
    symbol: z.string().describe("The trading pair, e.g: BTCUSDT, ETHUSDT"),
    interval: z.enum(Object.values(ELiquidationMapInterval) as [string, ...string[]]).describe("The time interval: 1d, 1w"),
    exchange: z.enum(Object.values(EExchangeName) as [string, ...string[]]).describe("The exchange name: Binance, Bybit, Okex")
  },
  async (params) => {

    const data = await coinankService.getLiquidationMap({
      symbol: params.symbol,
      interval: params.interval as ELiquidationMapInterval,
      exchange: params.exchange as EExchangeName
    });
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

// HyperLiquid tools
server.tool(
  "get_latest_whale_actions",
  "Get the latest whale actions on the HyperLiquid platform. Provide information about the large transactions and notable activities.",
  {},
  async () => {

    const data = await coinankService.getLatestWhaleActions();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_whale_pnl_statistics",
  "Get the statistics of the profit/loss (PnL) of the whales on the HyperLiquid platform.",
  {},
  async () => {

    await coinankService.initializeApiKey();
    const data = await coinankService.getStatisticWhalePnl();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_whale_positions",
  "Get the list of whale positions on the HyperLiquid platform.",
  {
    page: z.number().optional().describe("The page number, default is 1"),
    size: z.number().optional().describe("The number of results per page, default is 10")
  },
  async (params) => {

    const data = await coinankService.getWhalePositions({
      page: params.page,
      size: params.size
    });
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_address_total_pnl",
  "Get the total profit/loss (PnL) of a specific address on the HyperLiquid platform.",
  {
    address: z.string().describe("The address on HyperLiquid to query")
  },
  async (params) => {
    const data = await coinankService.getTotalPnlByAddress({
      address: params.address
    });
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_address_current_position",
  "Get the current position of a specific address on the HyperLiquid platform.",
  {
    address: z.string().describe("The address on HyperLiquid to query")
  },
  async (params) => {
    const data = await coinankService.getCurrentHyperLiquidPosition(params.address);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_address_position_history",
  "Get the transaction/position history of a specific address on the HyperLiquid platform.",
  {
    address: z.string().describe("The address on HyperLiquid to query")
  },
  async (params) => {
    const data = await coinankService.getHyperLiquidPositionHistory(params.address);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

// Fireant tools for Vietnam stock market
server.tool(
  "get_official_posts_vnstock",
  "Get the list of official posts from Vietnam stock market on Fireant platform.",
  {
    offset: z.number().optional().describe("The offset value"),
    limit: z.number().optional().describe("The number of results per page"),
    symbol: z.string().optional().describe("Filter by stock symbol")
  },
  async (params) => {
    const data = await fireantService.getListOfficialPostVnStock({
      offset: params.offset,
      limit: params.limit,
      symbol: params.symbol
    });
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_user_posts_vnstock",
  "Get the list of user posts from Vietnam stock market on Fireant platform.",
  {
    offset: z.number().optional().describe("The offset value"),
    limit: z.number().optional().describe("The number of results per page"),
    symbol: z.string().optional().describe("Filter by stock symbol")
  },
  async (params) => {
    const data = await fireantService.getListUserPostVnStock({
      offset: params.offset,
      limit: params.limit,
      symbol: params.symbol
    });
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_fundamental_analysis_vnstock",
  "Get fundamental analysis data of a Vietnam stock ticker.",
  {
    symbol: z.string().describe("The stock symbol, e.g: VNM, FPT, VIC")
  },
  async (params) => {
    await fireantService.initializeApiKey();
    const data = await fireantService.getFundamentalAnalysisTickerVnStock(params.symbol);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_company_profile_vnstock",
  "Get company profile information of a Vietnam stock ticker.",
  {
    symbol: z.string().describe("The stock symbol, e.g: VNM, FPT, VIC")
  },
  async (params) => {
    await fireantService.initializeApiKey();
    const data = await fireantService.getProfileVnStock(params.symbol);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_major_holders_vnstock",
  "Get major shareholders/holders information of a Vietnam stock ticker.",
  {
    symbol: z.string().describe("The stock symbol, e.g: VNM, FPT, VIC")
  },
  async (params) => {
    await fireantService.initializeApiKey();
    const data = await fireantService.getHolderofTickerVnStock(params.symbol);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_historical_price_vnstock",
  "Get historical price data of a Vietnam stock ticker.",
  {
    symbol: z.string().describe("The stock symbol, e.g: VNM, FPT, VIC"),
    startDate: z.string().describe("The start date in YYYY-MM-DD format, default is 1 week ago"),
    endDate: z.string().describe("The end date in YYYY-MM-DD format, default is today"),
    offset: z.number().describe("The offset value, default is 0"),
    limit: z.number().describe("The number of records to return, default is 100")
  },
  async (params) => {
    const data = await fireantService.getHistoryPriceVnStock({
      symbol: params.symbol,
      startDate: params.startDate,
      endDate: params.endDate,
      offset: params.offset,
      limit: params.limit
    });
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

server.tool(
  "get_financial_statement_vnstock",
  "Get financial statement data of a Vietnam stock ticker.",
  {
    symbol: z.string().describe("The stock symbol, e.g: VNM, FPT, VIC"),
    type: z.enum(Object.values(EFinancialStatementPeriod) as [string, ...string[]]).describe("Financial statement period: 'Q' (quarterly) or 'Y' (yearly)"),
    count: z.number().describe("The number of records to return, default is 10")
  },
  async (params) => {
    const data = await fireantService.getFinancialStatementVnStock({
      symbol: params.symbol,
      type: params.type as EFinancialStatementPeriod,
      count: params.count
    });
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

export default server;