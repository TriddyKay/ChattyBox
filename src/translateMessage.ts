import {Message, MessageOptions} from "discord.js"

export enum Command {
  PING = "!ping",
  SAY_HELLO = "!hello",
  CHANT = "!chant",
  ROLL = "!roll"
}

export const translateMessage = (message: Message): MessageOptions => {
  switch(message.content) {
    case Command.PING: return SendBotMessage.sendMessage('Pong!');
    case Command.SAY_HELLO: return SendBotMessage.sendMessage('Hello!', true);
    case Command.CHANT: return SendBotMessage.sendMessage('Tridda!. Tridda!. Tridda!. Tridda!.', true);
    case Command.ROLL: return SendBotMessage.roll(message.author.username)
    default: return SendBotMessage.sendMessage('I don\'t recognise the command')
  }
}

export const SendBotMessage = {

  sendMessage: (message: string, isVoiceMessage: boolean = false): MessageOptions => {
    return { content: message, tts: isVoiceMessage }
  },

  roll: (username: string) : MessageOptions => {
    const stringifiedNumber = Math.floor(Math.random()*(100-1+1)+1).toString()
    return SendBotMessage.sendMessage(`${username}: ${stringifiedNumber}`)
  },
}
