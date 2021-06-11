const reply = require('../other/reply'), { getBasicInfo } = require('ytdl-core');
module.exports = {
  name: 'information',
  aliases: ['info'],
  description: 'Shows information about the current song',
  usage: 'info',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to skip`);
    const song_url = server_queue.songs[0].url, song_info = await getBasicInfo(song_url), likes = song_info.videoDetails.likes, dislikes = song_info.videoDetails.dislikes, author = song_info.videoDetails.author, duration = parseInt(song_info.videoDetails.lengthSeconds), view_count = song_info.videoDetails.viewCount, thumbnail = song_info.videoDetails.thumbnails[0], upload_date = song_info.videoDetails.uploadDate;
    msg.channel.send({ embed: { url: song_info.videoDetails.video_url, title: server_queue.songs[0].title, author: { name: author.name, icon_url: author.thumbnails[0].url, url: author.channel_url }, thumbnail: { url: thumbnail.url }, description: `Duration: ${secondsToTime(duration)}\nViews: ${new Intl.NumberFormat().format(view_count)}\nUpload Date: ${upload_date}\nLikes: ${new Intl.NumberFormat().format(likes)}\nDislikes: ${new Intl.NumberFormat().format(dislikes)}\n\n[${reply(msg.author.id)}]` } });
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