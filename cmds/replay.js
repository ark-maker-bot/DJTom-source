module.exports = {
  name: 'replay',
  aliases: ['rp'],
  description: 'Replays the song currently playing once',
  usage: 'replay',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    let server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to resume`);
    if(server_queue.replay)return msg.reply(`Replay is already enabled`);
    if(server_queue.loop)return msg.reply(`Loop is currently enabled, Please disable loop to enable replay`);
    server_queue.replay = !server_queue.replay;
    msg.react('👌');
  }
}