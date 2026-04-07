import {bot} from "./config/bot.js";

import { setupCommands } from "./bot/commands/bot.comands.js";

setupCommands(bot);


bot.launch()
    .then(() => {
        console.log("Bot started successfully.");})
    .catch((err) => {
        console.error("Failed to launch bot:", err);
    });