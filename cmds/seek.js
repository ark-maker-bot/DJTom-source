const yt = require('ytdl-core'), p = require('./play');
module.exports = {
  name: 'seek',
  aliases: [],
  description: 'Seeks to a point in the current song',
  usage: 'seek <1-seconds in the soug>',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to change`);
    const max_seconds = Math.floor(server_queue.songs[0].duration), s = parseInt(args[0]);
    if(s >= max_seconds)return msg.reply({ embed: { description: `The entered value is larger than the song's duration` } });
    const old_streamtime = server_queue.connection.dispatcher.streamTime;
    module.exports.old_streamtime = old_streamtime;
    p.seek_track(server_queue.songs[0].url, msg, s);
  }
}