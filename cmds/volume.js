module.exports = {
  name: 'volume',
  aliases: ['vol'],
  description: 'Changes the volume of the music stream',
  usage: 'volume <1-100 | low, mid, max, double>',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to change`);
    if(!args[0])return msg.reply(`You didn't specifiy a value or low, mid, max`);
    let vol = args[0];
    if(vol > 100 && vol !== 'low' && vol !== 'mid' && vol !== 'max' && vol !== 'double')return msg.reply('If you want to have more volume please use, double');
    if(vol === 'low')vol = 10;
    else if(vol === 'mid')vol = 50;
    else if(vol === 'max')vol = 100;
    else if(vol === 'double')vol = 200;
    const volume = parseInt(vol);
    if(!volume)return msg.reply(`Volume was not specified`);
    server_queue.connection.dispatcher.setVolume((volume / 100));
    server_queue.volume = volume;
  }
}