module.exports = {
  name: 'clear',
  aliases: ['c'],
  description: 'Clears the music queue',
  usage: 'clear',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    let server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to resume`);
    server_queue.songs = [];
    msg.react('👌');
  }
}