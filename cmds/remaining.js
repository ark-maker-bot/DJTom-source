const bar = require('string-progressbar'), se = require('./seek');
module.exports = {
  name: 'remaining',
  aliases: ['time', 'r'],
  description: 'Shows the remaining time left on the music',
  usage: 'remaining',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to change`);
    const song_length = server_queue.songs[0].duration * 1000
    let total_streamtime = server_queue.connection.dispatcher.streamTime + (se.old_streamtime ? se.old_streamtime + (server_queue.songs[0].seek * 1000) : 0);
    const worked_out_time = song_length - total_streamtime;
    let song_txt = bar(Math.floor(server_queue.songs[0].duration), (Math.floor(total_streamtime / 1000)), 20);
    msg.channel.send({
      embed: {
        description: `[${server_queue.songs[0].title}](${server_queue.songs[0].url}) [<@!${msg.author.id}>]\n[${song_txt[0]}] ${secondsToTime(worked_out_time / 1000)} / ${secondsToTime(song_length / 1000)}`
      }
    });
  }
}
function secondsToTime(secs) {
  secs = Math.round(secs);
  let hours = Math.floor(secs / (60 * 60)), divisor_for_minutes = secs % (60 * 60), minutes = Math.floor(divisor_for_minutes / 60);
  let divisor_for_seconds = divisor_for_minutes % 60, seconds = Math.ceil(divisor_for_seconds);
  let obj = { "h": hours, "m": minutes, "s": seconds };
  let time = '';
  if(obj.h)time += `${obj.h}h `;
  if(obj.m)time += `${obj.m}m `;
  if(obj.s)time += `${obj.s}s`; 
  return time;
}