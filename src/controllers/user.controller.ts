import { createTransaction, getUserTransactions, upsertUser } from "../services/user_services.js";
import { Context } from 'telegraf';
import {TransactionType} from '../../generated/prisma/enums.js' 


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
        const description = args.slice(1).join(' ').trim();
        const category = "General";
        const type = TransactionType.EXPENSE
        
        if (isNaN(amount) || amount <= 0 || amount > 1000000 ) {
            ctx.reply("Please provide a valid amount.");
            return;
        }
        if (!description) {
            ctx.reply("Please provide a description.");
            return;
        }
        
        const transaction ={
            telegramId,
            amount,
            description,
            category,
            type
        }

        try {
            await createTransaction(transaction);
            ctx.reply(`Expense added: ${amount} - ${description}`);
        } catch (error) {
            console.error("Error adding expense:", error);
            ctx.reply("Failed to add expense. Please try again later.");
        }
    }


    static async handleIncomeCommand(ctx: Context) {
            if (!ctx.from) {
                ctx.reply("Unable to identify user. Please try again.");
                return;
            }
            if (!ctx.message || !('text' in ctx.message)) {
                ctx.reply("Invalid command format. Please use: /addincome <amount> <description>");
                return;
            }
            const args = ctx.message.text.split(' ').slice(1);
            if (args.length < 2) {
                ctx.reply("Usage: /addincome <amount> <description>");
                return;
            }
            const telegramId = BigInt(ctx.from.id);
            const amount = parseFloat(args[0]!);
            const description = args.slice(1).join(' ').trim();
            const category = "General";
            const type = TransactionType.INCOME
            if (isNaN(amount) || amount <= 0 || amount > 1000000 ) {
                ctx.reply("Please provide a valid amount.");
                return;
            }
            if (!description) {
                ctx.reply("Please provide a description.");
                return;
            }
            
            const transaction ={
                telegramId,
                amount,
                description,
                category,
                type
            }

            try {
                await createTransaction(transaction);
                ctx.reply(`Income added: ${amount} - ${description}`);
            } catch (error) {
                console.error("Error adding Income:", error);
                ctx.reply("Failed to add Income. Please try again later.");
            }
        }


    static async handleReportCommand(ctx: Context) {
        if (!ctx.from) {
            ctx.reply("Unable to identify user. Please try again.");
            return;
        }

        const telegramId = BigInt(ctx.from.id);
        try{
            const transactions = await getUserTransactions(telegramId);
            if(transactions.length === 0){
                ctx.reply("No transactions found.");
                return;
            }
            const totalTransactions = transactions.length
            const expenses = transactions.filter(t => t.type === TransactionType.EXPENSE)
            const incomes  = transactions.filter(t => t.type === TransactionType.INCOME )

            const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0)
            const totalIncomes = incomes.reduce((sum, t) => sum + t.amount, 0)
            const line = transactions.map(t => ` - ${t.type} ${t.amount.toFixed(2)} -- ${t.description}`).join("\n");
            const net = totalIncomes - totalExpenses;
            ctx.reply(
                `Income: ${totalIncomes.toFixed(2)}\n` +
                `Expenses: ${totalExpenses.toFixed(2)}\n` +
                `Net: ${net.toFixed(2)}\n\n` +
                `Last: ${totalTransactions}\n` +
                `transactions:\n ${line}` 
            )
       } 
       catch(error){
        console.error("Error get transacitons: ", error);
        ctx.reply("Failed to get transaction. please try again later")
       }
    }
}