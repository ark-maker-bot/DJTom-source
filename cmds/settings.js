module.exports = {
  name: 'settings',
  aliases: ['sett'],
  description: 'Shows you the current streaming settings',
  usage: 'settings',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    let server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to resume`);
    msg.reply({ embed: { title: `Settings for session ID#${server_queue.ses_id}`, description: `**Replay: ${server_queue.replay === true ? 'On' : 'Off'}\nLoop: ${server_queue.loop === true ? 'On' : 'Off'}\nVolume: ${server_queue.volume}%\nCurrent Song: [${server_queue.songs[0].title}](${server_queue.songs[0].url})${server_queue.songs[1] !== undefined ? `\nNext Song: [${server_queue.songs[1].title}](${server_queue.songs[1].url})` : ''}\nText Channel: ${server_queue.textChannel.name}\nVoice Channel: ${server_queue.voiceChannel.name}**` } });
  }
}