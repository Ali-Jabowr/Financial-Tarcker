import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is not defined in environment variables.");
}

const bot = new Telegraf(token);

bot.start((ctx) => {
    console.log("Received /start command from user:", ctx.from?.username || ctx.from?.id);
    const userFirstName = ctx.from?.first_name || "there";
    ctx.reply(`Welcome, ${userFirstName}! I'm your friendly bot. How can I assist you today?`);
});

bot.on('text', (ctx) => {
  console.log(`Incoming text: ${ctx.message.text} from ${ctx.from.id}`);
});

bot.catch((err) => {
    console.error("Error occurred in bot:", err);
});

bot.launch()
    .then(() => {
        console.log("Bot started successfully.");})
    .catch((err) => {
        console.error("Failed to launch bot:", err);
    });