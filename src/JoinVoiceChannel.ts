import {Channel, Message} from "discord.js"
import {joinVoiceChannel} from "@discordjs/voice"

export const JoinVoiceChannel = (channel: Channel, message: Message) => {
  joinVoiceChannel({
    channelId: channel.id,
    guildId: message.guild!.id,
    adapterCreator: message.guild!.voiceAdapterCreator
  })
}
