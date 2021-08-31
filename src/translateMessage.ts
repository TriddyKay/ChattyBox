import {MessageOptions} from "discord.js"

export enum Command {
  PING = "!ping",
  SAY_HELLO = "!hello"
}

export const translateMessage = (command: string): MessageOptions => {
  switch(command) {
    case Command.PING: return SendBotMessage.initializeConfirmation();
    case Command.SAY_HELLO: return SendBotMessage.sayHello();
    default: return SendBotMessage.unrecognisableCommand()
  }
}

export const SendBotMessage = {
  initializeConfirmation: (): MessageOptions => {
    return {content: "Pong"}
  },

  sayHello: (): MessageOptions => {
    return {content: "Hello!", tts: true}
  },

  unrecognisableCommand: (): MessageOptions => {
    return {content: 'I don\'t recognise the command'}
  }
}
