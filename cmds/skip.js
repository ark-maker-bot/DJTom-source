const reply = require('../other/reply');
module.exports = {
  name: 'skip',
  aliases: ['next'],
  description: 'Skips to the next song in the queue',
  usage: 'skip',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to skip`);
    msg.react('👌');
    if(server_queue.songs.length > 1)
      msg.channel.send({ embed: { description: `**Now Playing\n** [${server_queue.songs[1].title}](${server_queue.songs[1].url}) [${reply(msg.author.id)}]` } }).then(m => m.delete({timeout: 1000*60*2}));
    server_queue.connection.dispatcher.end();
  }
}