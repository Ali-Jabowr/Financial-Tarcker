import * as dotenv from "dotenv";
dotenv.config();

import { Telegraf } from "telegraf";
import { addExpenseCommand, startCommand } from "./bot/commands/bot.comands.js";
import { SocksProxyAgent } from 'socks-proxy-agent'; // npm install socks-proxy-agent

const agent = new SocksProxyAgent('socks5h://127.0.0.1:7897');
// Common default ports for local proxies are 1080, 10808, or 7890
const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is not defined in environment variables.");
}

const bot = new Telegraf(token, {
  telegram: { agent }
});

bot.start(startCommand);
bot.command('addexpense', addExpenseCommand);

bot.launch()
    .then(() => {
        console.log("Bot started successfully.");})
    .catch((err) => {
        console.error("Failed to launch bot:", err);
    });