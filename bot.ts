import {Channel, Message} from "discord.js"
import {joinVoiceChannel} from "@discordjs/voice"
import {ActionService} from "./src/ActionService"
require('dotenv').config();
const Discord = require('discord.js');
const {Intents} = require("discord.js");
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

  // const channels = await message.guild?.channels.fetch()
  // channels?.forEach((channel: any) => {
  //   if(channel.isVoice()) {
  //     return joinDiscordVoiceChannel(channel, message)
  //   }
  // })
});

const joinDiscordVoiceChannel = (channel: Channel, message: Message) => {
  joinVoiceChannel({
    channelId: channel.id,
    guildId: message.guild!.id,
    adapterCreator: message.guild!.voiceAdapterCreator
  })
}

