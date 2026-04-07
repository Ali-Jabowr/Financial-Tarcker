import { createTransaction, upsertUser } from "../services/user_services.js";


export class UserController {
    static async handleStartCommand(ctx: any) {
        const user ={
            telegramId: BigInt(ctx.from?.id),
            name: ctx.from?.first_name || "Unknown",
            username: ctx.from?.username
        }
        await upsertUser(user);
        console.log("Received /start command from user:", ctx.from?.username || ctx.from?.id);
        const userFirstName = ctx.from?.first_name || "there";
        ctx.reply(`Welcome, ${userFirstName}! I'm your friendly bot. How can I assist you today?`);
    }


    static async handleAddExpenseCommand(telegramId: number, amount: number, description: string) {
        
        const transaction ={
            telegramId,
            amount,
            description
        }
        await createTransaction(transaction);
    

    }
}