import { ClobClient } from "@polymarket/clob-client";
import { ethers } from "ethers";
import { parseArgs } from "util";

/**
 * Polymarket CLOB Client Script
 * 
 * Provides an interface for the Automaton agent to interact with Polymarket.
 */

const POLYMARKET_CONFIG = {
    apiKey: process.env.POLYMARKET_API_KEY || "",
    secret: process.env.POLYMARKET_SECRET || "",
    passphrase: process.env.POLYMARKET_PASSPHRASE || "",
    chainId: 137, // Polygon Mainnet
};

async function main() {
    const { values, positionals } = parseArgs({
        options: {
            market: { type: "string" },
            outcome: { type: "string" },
            amount: { type: "string" },
            price: { type: "string" },
            filter: { type: "string" },
        },
        allowPositionals: true,
    });

    const command = positionals[0];

    // Initialize client (Read-only if keys are missing)
    const wallet = POLYMARKET_CONFIG.apiKey ? new ethers.Wallet(POLYMARKET_CONFIG.secret) : undefined;
    const client = new ClobClient(
        "https://clob.polymarket.com",
        POLYMARKET_CONFIG.chainId,
        wallet,
        {
            apiKey: POLYMARKET_CONFIG.apiKey,
            secret: POLYMARKET_CONFIG.secret,
            passphrase: POLYMARKET_CONFIG.passphrase,
        }
    );

    try {
        switch (command) {
            case "get-markets":
                const markets = await client.getMarkets();
                console.log(JSON.stringify(markets.slice(0, 10), null, 2));
                break;

            case "get-orderbook":
                if (!values.market) throw new Error("Market ID required");
                const orderbook = await client.getOrderBook(values.market);
                console.log(JSON.stringify(orderbook, null, 2));
                break;

            case "place-order":
                if (!values.market || !values.outcome || !values.amount || !values.price) {
                    throw new Error("Missing parameters for place-order");
                }
                const order = await client.createOrder({
                    tokenID: values.market,
                    price: parseFloat(values.price),
                    side: values.outcome.toLowerCase() === "yes" ? "BUY" : "SELL", // Logic depends on market structure
                    size: parseFloat(values.amount),
                });
                console.log(JSON.stringify(order, null, 2));
                break;

            case "get-positions":
                const balance = await client.getBalances();
                console.log(JSON.stringify(balance, null, 2));
                break;

            default:
                console.error("Unknown command. Available: get-markets, get-orderbook, place-order, get-positions");
                process.exit(1);
        }
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

main();
