const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '7222769243:AAG6OP0K46McTV2oBxewL3hh7HEv_dIAL7A';
const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/start/, async (msg) => {
    console.log('start');
    const chatId = msg.chat.id;
    const telegramId = msg.from.id;
    try {
        await bot.sendMessage(chatId, 'Welcome to my bot', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Open web app', web_app: { url: 'https://hamster-bot-3b752d549dd5.herokuapp.com' } }]
                ]
            }
        });
    } catch (e) {
        console.log(e);
    }
});
