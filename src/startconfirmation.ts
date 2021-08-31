export enum Command {
  PING = "!ping",
}

export const translateMessage = (command: string): string => {
  switch(command) {
    case Command.PING: return SendBotMessage.initializeConfirmation()
  }
  return SendBotMessage.unrecognisableCommand()
}

export const SendBotMessage = {
  initializeConfirmation: (): string => {
    return  "Pong"
  },

  unrecognisableCommand: (): string => {
    return 'I don\'t recognise the command'
  }
}
