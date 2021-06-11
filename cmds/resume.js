module.exports = {
  name: 'resume',
  aliases: [],
  description: 'Resumes the music stream',
  usage: 'resume',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to resume`);
    server_queue.connection.dispatcher.resume();
    msg.react('👌');
  }
}