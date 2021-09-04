import {Message} from "discord.js"
import {Command} from "./domain/Commands"
import {TranslateMessage} from "./TranslateMessage"

export type ChattyBoxActions = Promise<Message> | void

export const ActionService = {
  determineAction: (message: Message): ChattyBoxActions => {
    switch(message.content) {
      case Command.PING: return TranslateMessage.sendMessage(message, 'Pong!');
      case Command.SAY_HELLO: return TranslateMessage.sendMessage(message, 'Hello!', true);
      case Command.CHANT: return TranslateMessage.sendMessage(message, 'Tridda!. Tridda!. Tridda!. Tridda!.', true);
      case Command.HEIST: return TranslateMessage.sendMessage(message, 'You son of a bitch, I\'m in', true);
      case Command.ROLL: return TranslateMessage.roll(message, message.author.username)
      case Command.ONE_PIECE:
      default: return TranslateMessage.sendMessage(message, 'I don\'t recognise the command')
    }
  }
}
