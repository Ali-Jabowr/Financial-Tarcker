import { UserController } from "../../controllers/user.controller.js";
import { Telegraf, Context } from 'telegraf';

export const setupCommands = (bot: Telegraf<Context>) => {
    // Mapping the "Trigger" to the "Controller Method"
    bot.start(startCommand);
    bot.command('addexpense', addExpenseCommand);
    // bot.command('report', UserController.han);
    // bot.command('help', (ctx) => ctx.reply("Send me: /addexpense <amount> <desc>"));
};



export const startCommand = async (ctx: any) => {
    await UserController.handleStartCommand(ctx)
}


export const addExpenseCommand = async (ctx: any) => {
    const args = ctx.message.text.split(' ').slice(1);
    if (args.length < 2) {
        ctx.reply("Usage: /addexpense <amount> <description>");
        addExpenseCommand;
        return;
    }
    const amount = parseFloat(args[0]);
    const description = args[1];
    const category = args[2] || "General";
    console.log(`args: ${category}`);
    if (isNaN(amount) || amount <= 0 ) {
        ctx.reply("Please provide a valid amount.");
        return;
    }
    try {
        await UserController.handleAddExpenseCommand(ctx.from.id, amount, description, category);
        ctx.reply(`Expense added: ${amount} - ${description} - ${category}`);
    } catch (error) {
        console.error("Error adding expense:", error);
        ctx.reply("Failed to add expense. Please try again later.");
    }
}