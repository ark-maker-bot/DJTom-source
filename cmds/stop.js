module.exports = {
  name: 'stop',
  aliases: ['end'],
  description: 'Stops the music stream',
  usage: 'stop',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to stop`);
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
    msg.react('👌');
  }
}