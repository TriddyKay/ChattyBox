import {Message, MessageOptions} from "discord.js"

export enum Command {
  PING = "!ping",
  SAY_HELLO = "!hello",
  ROLL = "!roll"
}

export const translateMessage = (message: Message): MessageOptions => {
  switch(message.content) {
    case Command.PING: return SendBotMessage.initializeConfirmation();
    case Command.SAY_HELLO: return SendBotMessage.sayHello();
    case Command.ROLL: return SendBotMessage.roll(message.author.username)
    default: return SendBotMessage.unrecognisableCommand()
  }
}

export const SendBotMessage = {
  initializeConfirmation: (): MessageOptions => {
    return { content: "Pong" }
  },

  sayHello: (): MessageOptions => {
    return { content: "Hello!", tts: true }
  },

  roll: (username: string) : MessageOptions => {
    const stringifiedNumber = Math.floor(Math.random()*(100-1+1)+1).toString()
    return { content: `${username}: ${stringifiedNumber}`}
  },

  unrecognisableCommand: (): MessageOptions => {
    return { content: 'I don\'t recognise the command' }
  }
}
