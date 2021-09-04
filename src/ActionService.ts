import {Message} from "discord.js"
import {Command} from "./domain/Commands"
import {TranslateMessage} from "./TranslateMessage"
import {joinVoiceChannel} from "@discordjs/voice"

export type ChattyBoxActions = Promise<Message> | Promise<void> | Promise<Message | void>

export const ActionService = {
  determineAction: (message: Message): ChattyBoxActions => {
    switch(message.content) {
      case Command.PING: return TranslateMessage.sendMessage(message, 'Pong!');
      case Command.SAY_HELLO: return TranslateMessage.sendMessage(message, 'Hello!', true);
      case Command.CHANT: return TranslateMessage.sendMessage(message, 'Tridda!. Tridda!. Tridda!. Tridda!.', true);
      case Command.HEIST: return TranslateMessage.sendMessage(message, 'You son of a bitch, I\'m in', true);
      case Command.ROLL: return TranslateMessage.roll(message, message.author.username)
      case Command.ONE_PIECE: return ActionService.joinDiscordVoiceChannel(message)
      default: return TranslateMessage.sendMessage(message, 'I don\'t recognise the command')
    }
  },

  joinDiscordVoiceChannel: async (message: Message) => {
    const channels = await message.guild?.channels.fetch()
    return !channels
      ? TranslateMessage.sendMessage(message, "No voice channels to join!")
      : channels.forEach((channel: any) => {
        if(channel.isVoice()) {
          joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild!.id,
            adapterCreator: message.guild!.voiceAdapterCreator
          })
        }
      })
  }
}
