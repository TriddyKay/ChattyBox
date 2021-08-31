import {Message} from "discord.js"

require('dotenv').config();
const Discord = require('discord.js');
const {Intents} = require("discord.js");
const TOKEN = process.env.TOKEN;
const bot = new Discord.Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
import {translateMessage} from "./src/startconfirmation";

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag} and ready to party!`);
});

bot.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;

  const translatedMessage = translateMessage(message.content)
  message.channel.send({content: translatedMessage, tts: true})
});