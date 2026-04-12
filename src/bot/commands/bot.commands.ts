import { UserController } from "../../controllers/user.controller.js";
import { Telegraf, Context } from 'telegraf';

export const setupCommands = (bot: Telegraf<Context>) => {
    // Mapping the "Trigger" to the "Controller Method"
    bot.start(startCommand);
    bot.command('addexpense', addExpenseCommand);
    bot.command('addincome', addIncomeCommand);
    bot.command('report', reportCommand );
    bot.command('help', helpCommand);
};



export const startCommand = async (ctx: Context) => {
    await UserController.handleStartCommand(ctx)
}

export const addExpenseCommand = async (ctx: Context) => {
    await UserController.handleAddExpenseCommand(ctx)
}

export const reportCommand = async (ctx: Context) => {
    await UserController.handleReportCommand(ctx)
}

export const addIncomeCommand = async (ctx: Context) => {
    await UserController.handleIncomeCommand(ctx)
}

export const helpCommand = async (ctx: Context) => {
    ctx.reply(
        "Available commands:\n\n" +
        "/addexpense <amount> <description> — Record an expense\n" +
        "/addincome <amount> <description> — Record income\n" +
        "/report — View your financial summary\n" +
        "/help — Show this message"
    );
}