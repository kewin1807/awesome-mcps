# Awesome MCPs

A collection of Model Context Protocol (MCP) tools for crypto market data analysis, focusing on liquidation heatmaps and whale tracking on HyperLiquid.

## Overview

This repository contains MCP tools that provide real-time crypto market data analysis capabilities, including:

- Liquidation heatmaps and maps from various exchanges
- HyperLiquid whale activity tracking
- Position and PnL analysis for HyperLiquid accounts
- Vietnam Stock Market data analysis via Fireant

## Installation

```bash
# Clone the repository
git clone https://github.com/kewin1807/awesome-mcps.git
cd awesome-mcps

# Install dependencies
yarn install
```

## Build
```bash
yarn build
```

## Usage

```bash
# Start the MCP server by stdio
yarn start:stdio

# Start the MCP server by sse
yarn start
```

## Available MCP Tools

### Liquidation Analysis

- **get_liquidation_heatmap**: Get the liquidation heatmap data of a cryptocurrency pair.
  - Parameters:
    - `symbol`: Trading pair (e.g., BTCUSDT, ETHUSDT)
    - `interval`: Time interval (12h, 1d, 3d, 1w, 2w, 1m, 3m, 6m, 1y)
    - `exchangeName`: Exchange name (Binance, Bybit, Okex)

- **get_liquidation_map**: Get detailed information about liquidation positions by price level.
  - Parameters:
    - `symbol`: Trading pair (e.g., BTCUSDT, ETHUSDT)
    - `interval`: Time interval (1d, 1w)
    - `exchange`: Exchange name (Binance, Bybit, Okex)

### HyperLiquid Whale Tracking

- **get_latest_whale_actions**: Get the latest whale actions on the HyperLiquid platform.

- **get_whale_pnl_statistics**: Get PnL statistics of whales on HyperLiquid.

- **get_whale_positions**: Get the list of whale positions on HyperLiquid.
  - Parameters:
    - `page` (optional): Page number
    - `size` (optional): Number of results per page

### Address-specific Analysis

- **get_address_total_pnl**: Get the total PnL of a specific address on HyperLiquid.
  - Parameters:
    - `address`: HyperLiquid wallet address

- **get_address_current_position**: Get the current position of a specific address.
  - Parameters:
    - `address`: HyperLiquid wallet address

- **get_address_position_history**: Get the transaction/position history of a specific address.
  - Parameters:
    - `address`: HyperLiquid wallet address

### Vietnam Stock Market Tools

- **get_official_posts_vnstock**: Get the list of official posts from Vietnam stock market.
  - Parameters:
    - `offset` (optional): The offset value
    - `limit` (optional): Number of results to return
    - `symbol` (optional): Filter by stock symbol

- **get_user_posts_vnstock**: Get the list of user posts from Vietnam stock market.
  - Parameters:
    - `offset` (optional): The offset value
    - `limit` (optional): Number of results to return
    - `symbol` (optional): Filter by stock symbol

- **get_fundamental_analysis_vnstock**: Get fundamental analysis data of a Vietnam stock ticker.
  - Parameters:
    - `symbol`: The stock symbol (e.g., VNM, FPT, VIC)

- **get_company_profile_vnstock**: Get company profile information of a Vietnam stock ticker.
  - Parameters:
    - `symbol`: The stock symbol (e.g., VNM, FPT, VIC)

- **get_major_holders_vnstock**: Get major shareholders information of a Vietnam stock ticker.
  - Parameters:
    - `symbol`: The stock symbol (e.g., VNM, FPT, VIC)

- **get_historical_price_vnstock**: Get historical price data of a Vietnam stock ticker.
  - Parameters:
    - `symbol`: The stock symbol (e.g., VNM, FPT, VIC)
    - `startDate` (optional): The start date in YYYY-MM-DD format
    - `endDate` (optional): The end date in YYYY-MM-DD format
    - `offset` (optional): The offset value
    - `limit` (optional): Number of records to return

- **get_financial_statement_vnstock**: Get financial statement data of a Vietnam stock ticker.
  - Parameters:
    - `symbol`: The stock symbol (e.g., VNM, FPT, VIC)
    - `type`: Financial statement period - 'Q' (quarterly) or 'Y' (yearly)
    - `count` (optional): Number of records to return

## Implementation Details

The tools connect to various crypto data providers, including Coinank's API for market data and Fireant for Vietnam stock market data. The API keys are automatically fetched during runtime using a headless browser. 