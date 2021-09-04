import {Message} from "discord.js"

export const TranslateMessage = {

  sendMessage: (message: Message, body: string, isVoiceMessage: boolean = false): Promise<Message> => {
    return message.channel.send({
      content: body,
      tts: isVoiceMessage
    })
  },

  roll: (message: Message, username: string): Promise<Message> => {
    const stringifiedNumber = Math.floor(Math.random()*(100-1+1)+1).toString()
    return TranslateMessage.sendMessage(message,`${username}: ${stringifiedNumber}`)
  },
}
