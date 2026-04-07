import { UserController } from "../../controllers/user.controller.js";


export const startCommand = async (ctx: any) => {
    await UserController.handleStartCommand(ctx)
}


export const addExpenseCommand = async (ctx: any) => {
    const args = ctx.message.text.split(' ').slice(1);
    if (args.length < 2) {
        ctx.reply("Usage: /addexpense <amount> <description>");
        return;
    }
    const amount = parseFloat(args[0]);
    const description = args.slice(1).join(' ');
    if (isNaN(amount)) {
        ctx.reply("Please provide a valid amount.");
        return;
    }
    await UserController.handleAddExpenseCommand(ctx.from?.id, amount, description);
    ctx.reply(`Expense of ${amount} added successfully!`);
}