import {Message} from "discord.js"
import {ActionService} from "./src/ActionService"
const Discord = require('discord.js');
const {Intents} = require("discord.js");

require('dotenv').config();
const TOKEN = process.env.TOKEN;
const bot = new Discord.Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag} and ready to party!`);
});

bot.on('messageCreate', async (message: Message) => {
  const messageDoesNotStartWithPrefix = !message.content.startsWith("!")
  if (message.author.bot) return;
  if (messageDoesNotStartWithPrefix) return;

  return ActionService.determineAction(message)
});
