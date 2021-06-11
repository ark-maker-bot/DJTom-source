module.exports = {
  name: 'queue',
  aliases: ['q'],
  description: 'Shows the current music queue for that server',
  usage: 'queue',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to resume`);
    const songs = server_queue.songs;
    let songs_list = '', limit = songs.length > 10 ? 10 : songs.length;
    for(let i = 0; i < limit; i++){
      const song = songs[i];
      let addon_0 = '(current track)', addon_1 = '(next track)', idx = i + 1;
      if(i === 0)songs_list += `${idx}. **[${song.title}](${song.url})** ${addon_0}\n`;
      else if(i === 1)songs_list += `${idx}. **[${song.title}](${song.url})** ${addon_1}\n`;
      else songs_list += `${idx}. **[${song.title}](${song.url})**\n`;
    }
    msg.channel.send({ embed: { description: `${songs_list === '' ? 'EMPTY' : songs_list}` } });
  }
}