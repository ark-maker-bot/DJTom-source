module.exports = {
  name: 'leave',
  aliases: ['disconnect', 'l', 'd'],
  description: 'Leaves the current voice channel',
  usage: 'leave',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to play`);
    if(!server_queue.connection || !server_queue.voiceChannel)return msg.reply(`I haven't connected therefore I can't not leave.`);
    server_queue.voiceChannel.leave();
    msg.react('✌️');
  }
}