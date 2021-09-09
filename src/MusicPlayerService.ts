import {Message, StageChannel, VoiceChannel} from "discord.js"
import {TranslateMessage} from "./TranslateMessage"
import {AudioPlayerStatus, AudioResource, createAudioPlayer, createAudioResource, entersState, joinVoiceChannel, NoSubscriberBehavior, VoiceConnection, VoiceConnectionStatus} from "@discordjs/voice"
const ytdl = require('ytdl-core')

export const MusicPlayerService = {
  playOnePiece: async (message: Message) => {
    const voiceChannel = await MusicPlayerService.collectFirstVoiceChannel(message)

    if(voiceChannel && voiceChannel.isVoice()) {
      const connection = await MusicPlayerService.joinDiscordVoiceChannel(message, voiceChannel)
      return MusicPlayerService.playByUrl(voiceChannel, connection)
    }

    return TranslateMessage.sendMessage(message, "No voice channels to join!")
  },

  collectFirstVoiceChannel: async (message: Message) => {
    const channels = await message.guild?.channels.fetch()
    return channels
      ? channels!.filter(channel => channel.name === channel.isVoice()).first()
      : null
  },

  joinDiscordVoiceChannel: async (message: Message, channel: VoiceChannel | StageChannel) => {
    return joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild!.id,
      adapterCreator: message.guild!.voiceAdapterCreator
    })
  },

  playByUrl: async (channel: VoiceChannel | StageChannel, connection: VoiceConnection) => {
    const audioPlayer = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    })

    connection.subscribe(audioPlayer);

    const audioResource: AudioResource = createAudioResource('https://www.youtube.com/watch?v=adJFT6_j9Uk', {
      inlineVolume: true
    })

    connection.on(VoiceConnectionStatus.Ready, (oldState, newState) => {
      console.log('Connection is in the Ready state!');
    });

    connection.on('stateChange', (oldState, newState) => {
      console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
    });

    audioPlayer.on(AudioPlayerStatus.Playing, (oldState, newState) => {
      console.log('Audio player is in the Playing state!');
    });

    audioPlayer.play(audioResource)
  },
}
