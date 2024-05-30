const TelegramBot = require('node-telegram-bot-api');
const regexCloudfront = /cloudfront\.net\s*\/\s*(.*?)\//;
const regexPwLive = /(?<=pw\.live\/)[^\/]+/;

// Create a bot instance
function createBot(token) {
    const bot = new TelegramBot(token, { polling: true });

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Hello! OMJI assistant here. Send me a link, and I will convert it.');
    });

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;

        // Check if the message contains a link matching the cloudfront pattern
        if (msg.text && regexCloudfront.test(msg.text)) {
            const match = msg.text.match(regexCloudfront);
            const modifiedUrl1 = `https://penpencilvod.pc.cdn.bitgravity.com/${match[1]}/master.m3u8`;
            
            bot.sendMessage(chatId, 
                ` 
USE THIS LINK ON 1DM APP AND BOT:
     
${modifiedUrl1}
  
powered by @omjibotz
                `
            );
        }
        // Check if the message contains a link matching the pw.live pattern
        else if (msg.text && regexPwLive.test(msg.text)) {
            const match = msg.text.match(regexPwLive);
            const modifiedUrl2 = `https://penpencilvod.pc.cdn.bitgravity.com/${match[0]}/master.m3u8`;
            
            bot.sendMessage(chatId, 
                ` 
USE THIS LINK ON 1DM APP AND BOT:
     
${modifiedUrl2}
  
powered by @omjibotz
                `
            );
        }
        // If the link does not match either pattern
        else {
            bot.sendMessage(chatId, 'Please enter the right link && report wrong link here @Lob_u_omi_bot');
        }
    });

    return bot;
}

module.exports = createBot;
