module.exports = {
  name: 'pause',
  aliases: [],
  description: 'Pauses the music stream',
  usage: 'pause',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to pause`);
    server_queue.connection.dispatcher.pause();
    msg.react('👌');
  }
}