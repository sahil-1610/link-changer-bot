const TelegramBot = require('node-telegram-bot-api');
const regex = /cloudfront\.net\s*\/\s*(.*?)\//;


// Create a bot instance
function createBot(token) {
    const bot = new TelegramBot(token, { polling: true });

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Hello! OMJI assistant here, Send me a link, and I will convert it.');
    });

   bot.on('message', (msg) => {
    // Check if the message contains a link
    if (msg.text && regex.test(msg.text)) {
        const chatId = msg.chat.id;
        const modifiedUrl1 = `https://penpencilvod.pc.cdn.bitgravity.com/${msg.text.match(regex)[1]}/master.m3u8`;
        
        bot.sendMessage(chatId, 
            ` 
USE THIS LINK ON 1DM APP AND BOT:
     
${modifiedUrl1}
  
powered by @omjibotz
            `
        );
    }
});

    return bot;
}

module.exports = createBot;