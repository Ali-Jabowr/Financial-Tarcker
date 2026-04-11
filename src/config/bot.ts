import * as dotenv from "dotenv";
dotenv.config();
import { Telegraf } from "telegraf";
import { SocksProxyAgent } from 'socks-proxy-agent';

const token = process.env.BOT_TOKEN;
const proxyUrl = process.env.PROXY_URL;

if (!token) {
  throw new Error("BOT_TOKEN is not defined in environment variables.");
}

const agent = proxyUrl ? new SocksProxyAgent(proxyUrl) : undefined;

export const bot = new Telegraf(token, {
  telegram: { agent }
});

