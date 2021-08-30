export enum Command {
  PING = "!ping"
}

export type BotMessage = {
  to: string,
  message?: string,
  tts?: boolean,
  nonce?: string,
  typing?: boolean,
  embed?: any
}

export const translateMessage = (command: string, channelId: string): BotMessage => {
  switch(command) {
    case Command.PING: return SendBotMessage.initializeConfirmation(channelId)
  }
  return SendBotMessage.unrecognisableCommand(channelId)
}

export const SendBotMessage = {
  initializeConfirmation: (channelId: string): any => {
    return { to: channelId, message: "Pong" }
  },

  unrecognisableCommand: (channelId: string): any => {
    return { to: channelId, message: 'I don\'t recognise the command' }
  }
}
