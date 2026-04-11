import { UserController } from "../../controllers/user.controller.js";
import { Telegraf, Context } from 'telegraf';

export const setupCommands = (bot: Telegraf<Context>) => {
    // Mapping the "Trigger" to the "Controller Method"
    bot.start(startCommand);
    bot.command('addexpense', addExpenseCommand);
    // bot.command('report', UserController.han);
    // bot.command('help', (ctx) => ctx.reply("Send me: /addexpense <amount> <desc>"));
};



export const startCommand = async (ctx: Context) => {
    await UserController.handleStartCommand(ctx)
}

export const addExpenseCommand = async (ctx: Context) => {
    await UserController.handleAddExpenseCommand(ctx)
}