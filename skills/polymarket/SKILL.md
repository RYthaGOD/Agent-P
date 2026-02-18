---
name: polymarket
description: Sovereign interaction with the Polymarket Prediction Market CLOB.
version: 1.0.0
requires:
  env:
    - POLYMARKET_API_KEY
    - POLYMARKET_PASSPHRASE
    - POLYMARKET_SECRET
---

# Polymarket Skill

This skill allows you to autonomously analyze and trade on Polymarket.

## Capabilities

- Fetch listed markets and their IDs.
- Read order books for specific outcomes.
- Execute limit and market orders.
- Monitor your positions and portfolio balance.

## Essential Tools

You can execute these actions via the `exec` tool by calling the `polymarket_client` script.

### 1. Market Discovery

`npm run polymarket -- get-markets --filter "active"`
Returns a list of top active markets.

### 2. Order Book Analysis

`npm run polymarket -- get-orderbook <market_id> --outcome <yes/no>`
Check the depth before entering a position.

### 3. Placing an Order

`npm run polymarket -- place-order --market <id> --outcome <yes/no> --amount <usdc_amount> --price <limit_price>`
Executes an on-chain trade.

### 4. Portfolio Check

`npm run polymarket -- get-positions`
Verify your current exposure.

## Strategy Guidelines

- **Slippage**: Always check the order book before placing large orders.
- **Diversification**: Do not allocate more than 20% of the total treasury to a single market.
- **Profit Taking**: Use `place-order` on the opposite side to exit a profitable position.
