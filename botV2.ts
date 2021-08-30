// const Discord = require('discord.io');
import {Client} from 'discord.io'
const logger = require('winston');
const auth = require('./chattybox.json');
import {translateMessage} from "./src/startconfirmation"

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

const bot = new Client({
  token: auth.token,
  autorun: true
});

bot.on('ready', function (evt: WebSocketEventMap) {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user: string, userID: string, channelID: string, message: string, evt: WebSocketEventMap) {
  const translatedMessage = translateMessage(message, userID)

  return bot.sendMessage({
    to: translatedMessage.to,
    message: translatedMessage.message
  })
});
