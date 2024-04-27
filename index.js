const express = require("express");
const dotenv = require("dotenv");
const TelegramBot = require('node-telegram-bot-api');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const token = process.env.TOKEN;
const regex = /cloudfront\.net\s*\/\s*(.*?)\//;

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello! OMJI assistant here, Send me a link, and I will convert it.');
});

bot.on('message', (msg) => {
    // Check if the message contains a link
    if (msg.text && regex.test(msg.text)) {
        const chatId = msg.chat.id;
        const modifiedUrl = `https://api-sarkari.koyeb.app/pwhls?link=https://d1d34p8vz63oiq.cloudfront.net/${msg.text.match(regex)[1]}/master.m3u8`;
        bot.sendMessage(chatId, `Here Your Modified URL {use in BOT || 1dm}: ${modifiedUrl}`);
    }
});
