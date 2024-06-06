const TelegramBot = require('node-telegram-bot-api');

// Define the base URL globally
const BASE_URL = 'https://pw-signed-url-26260d62e264.herokuapp.com?v=';
const PIXEL1 = "&quality=240"
const PIXEL2 = "&quality=360"
const PIXEL3 = "&quality=480"
const PIXEL4 = "&quality=720"

// Define regex patterns
const regexCloudfront = /cloudfront\.net\s*\/\s*(.*?)\//;
const regexPwLive = /(?<=pw\.live\/)[^\/]+/;
const regexVParam = /(?<=v=)[^&?]+/;

// Create a bot instance
function createBot(token) {
    const bot = new TelegramBot(token, { polling: true });

    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Hello! OMJI assistant here. Send me a link, and I will convert it.');
    });

    bot.on('message', (msg) => {
        const chatId = msg.chat.id;

        if (msg.text) {
            let match;
            let modifiedUrl;

            // Check if the message contains a link matching the cloudfront pattern
            if (regexCloudfront.test(msg.text)) {
                match = msg.text.match(regexCloudfront);
                modifiedUrl = `${BASE_URL}${match[1]}`;
            }
            // Check if the message contains a link matching the pw.live pattern
            else if (regexPwLive.test(msg.text)) {
                match = msg.text.match(regexPwLive);
                modifiedUrl = `${BASE_URL}${match[0]}`;
            }
            // Check if the message contains a link with v= parameter
            else if (regexVParam.test(msg.text)) {
                match = msg.text.match(regexVParam);
                modifiedUrl = `${BASE_URL}${match[0]}`;
            }

            // If a match is found, send the modified URL
            if (modifiedUrl) {
                bot.sendMessage(chatId, 
                    ` 
USE THIS LINK ON 1DM APP AND BOT:
         
${modifiedUrl}${PIXEL1},

${modifiedUrl}${PIXEL2},

${modifiedUrl}${PIXEL3},

${modifiedUrl}${PIXEL4},
      
powered by @omjibotz
                    `
                );
            } else {
                // If no match is found, prompt the user to enter the right link
                bot.sendMessage(chatId, 'Please enter the right link. & report wrong link here @Lob_u_omi_bot');
            }
        }
    });

    return bot;
}

module.exports = createBot;
