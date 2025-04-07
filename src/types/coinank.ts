export type THeatMapRequest = {
  exchangeName: string;
  symbol: string;
  interval: "12h" | "1d" | "3d" | "1w" | "2w" | "1m" | "3m" | "6m" | "1y";
};


export type TLiquidationMapRequest = {
  exchange: "Binance" | "Bybit" | "Okex";
  symbol: string;
  interval: "1d" | "1w"
}

export type TAggregateLiquidationRequest = {
  baseCoin: string
  interval: "1d" | "1w"
}

export type TBaseQuery = {
  page?: number;
  size?: number;
}

export type TAddress = {
  address: string;
}

export type TRealtimeLongshortRatio = {
  baseCoin: string;
  interval: "5m" | "15m" | "30m" | "1h" | "2h" | "4h" | "6h" | "12h"
}