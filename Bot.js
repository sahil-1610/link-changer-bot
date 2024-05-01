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
        const modifiedUrl1 = `https://api-sarkari.koyeb.app/pwhls?link=https://d1d34p8vz63oiq.cloudfront.net/${msg.text.match(regex)[1]}/master.m3u8`;
        const modifiedUrl2 = `https://pwjarvis.onrender.com?v=${msg.text.match(regex)[1]}&quality=`;
        const modifiedUrl3 = `https://psitoffers.store/1dm.php?vid=${msg.text.match(regex)[1]}`;
        const modifiedUrl4 = `https://psitoffers.store/testkey.php?vid=${msg.text.match(regex)[1]}&quality=`;

        bot.sendMessage(chatId, 
            ` 
USE THIS LINK ON 1DM APP:
    
${modifiedUrl1},

${modifiedUrl3}

USE THIS LINK ON BOT:
 
${modifiedUrl2+240}, 
  
${modifiedUrl2+360}, 
  
${modifiedUrl2+480}, 
  
${modifiedUrl2+720}
 &
${modifiedUrl4+240},

${modifiedUrl4+360}, 
  
${modifiedUrl4+480}, 

${modifiedUrl4+720}

powered by @omjibotz
            `
        );
    }
});

    return bot;
}

module.exports = createBot;
