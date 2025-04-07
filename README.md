# Awesome MCPs

A collection of Model Context Protocol (MCP) tools for crypto market data analysis, focusing on liquidation heatmaps and whale tracking on HyperLiquid.

## Overview

This repository contains MCP tools that provide real-time crypto market data analysis capabilities, including:

- Liquidation heatmaps and maps from various exchanges
- HyperLiquid whale activity tracking
- Position and PnL analysis for HyperLiquid accounts

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

## Implementation Details

The tools connect to various crypto data providers, including Coinank's API for market data. The API key is automatically fetched during runtime using a headless browser. 