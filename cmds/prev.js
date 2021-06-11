module.exports = {
  name: 'prev',
  aliases: ['pv'],
  description: 'Gets the previous song and puts it to the end of queue',
  usage: 'prev',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to pause`);
    if(!client.prev_song)return msg.reply({ embed: { description: `Previous song isn't defined [<@!${msg.author.id}>]` } });
    server_queue.songs.push(client.prev_song);
    return msg.channel.send({ embed: { description: `Queued [${client.prev_song.title}](${client.prev_song.url}) [<@!${msg.author.id}>]` } }).then(msg => client.prev_song = null);
  }
}