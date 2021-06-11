module.exports = {
  name: 'loop',
  aliases: [],
  description: 'Loops the song currently playing',
  usage: 'loop',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    let server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to resume`);
    if(server_queue.replay)return msg.reply(`Replay is already enabled, Please disable replay to enable looping`);
    server_queue.loop = !server_queue.loop;
    msg.react('👌');
  }
}