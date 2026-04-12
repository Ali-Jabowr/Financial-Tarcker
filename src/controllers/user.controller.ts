import { createTransaction, upsertUser } from "../services/user_services.js";
import { Context } from 'telegraf';


export class UserController {
    static async handleStartCommand(ctx: Context) {
        if (!ctx.from) {
            ctx.reply("Unable to identify user. Please try again.");
            return;
        }
        const user ={
            telegramId: BigInt(ctx.from.id),
            name: ctx.from.first_name || "Unknown",
            ...ctx.from.username && {username: ctx.from.username}
        }
        await upsertUser(user);
        console.log("Received /start command from user:", ctx.from.username || ctx.from.id);
        const userFirstName = ctx.from.first_name || "there";
        ctx.reply(`Welcome, ${userFirstName}! I'm your friendly bot. How can I assist you today?`);
    }


    static async handleAddExpenseCommand(ctx: Context) {
        if (!ctx.from) {
            ctx.reply("Unable to identify user. Please try again.");
            return;
        }
        if (!ctx.message || !('text' in ctx.message)) {
            ctx.reply("Invalid command format. Please use: /addexpense <amount> <description>");
            return;
        }
        const args = ctx.message.text.split(' ').slice(1);
        if (args.length < 2) {
            ctx.reply("Usage: /addexpense <amount> <description>");
            return;
        }
        const telegramId = BigInt(ctx.from.id);
        const amount = parseFloat(args[0]!);
        const description = args.slice(1).join(' ');
        const category = "General";
        if (isNaN(amount) || amount <= 0 ) {
            ctx.reply("Please provide a valid amount.");
            return;
        }
        
        const transaction ={
            telegramId,
            amount,
            description,
            category
        }

        try {
            await createTransaction(transaction);
            ctx.reply(`Expense added: ${amount} - ${description}}`);
        } catch (error) {
            console.error("Error adding expense:", error);
            ctx.reply("Failed to add expense. Please try again later.");
        }
    

    }
}