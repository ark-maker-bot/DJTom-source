const yt = require('ytdl-core'), fs = require('fs'), ply = require('ytpl'), sr = require('ytsr'), { MessageEmbed } = require('discord.js'), reply = require('../other/reply');
const { isArray } = require('util');
const { getData, getTracks, getPreview } = require('spotify-url-info');

module.exports = {
  name: 'play',
  aliases: ['p'],
  description: 'Joins and plays a requested song from youtube',
  usage: 'play <url | search_term>',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const term = args.slice(0).join(' ');
    if(!term)return msg.reply(`You didn't enter a URL or SEARCH_TERM`);
    let server_queue = client.queue.get(msg.guild.id), song = await managing_data(client, msg, term);

    if(!song || song === null){
      return msg.reply({ embed: { description: `Song information was failed to grab [${reply(msg.author.id)}]` } });
    }

    if(server_queue){
      if(isArray(song))for(const so of song)server_queue.songs.push(so);
      else server_queue.songs.push(song);
      return create_queue_embed(msg, song);
    }

    const queue_class = {
      textChannel: msg.channel,
      voiceChannel: msg.member.voice.channel,
      connection: null,
      songs: [],
      volume: 50,
      playing: true,
      replay: false,
      loop: false,
      ses_id: shortcode(6)
    };

    client.queue.set(msg.guild.id, queue_class);
    if(isArray(song))for(const so of song)queue_class.songs.push(so);
    else queue_class.songs.push(song);

    try{ 
      const connection = await msg.member.voice.channel.join();
      msg.channel.send('**DJ Tom** has entered the chat').then(m => m.delete({ timeout: 2000 }));
      queue_class.connection = connection;
      create_queue_embed(msg, song);
      if(!msg.guild.me.voice.serverDeaf)await msg.guild.me.voice.setDeaf(true);
      await start_track(queue_class.songs[0].url, msg);  
      connection.on('disconnect', async() => {
	      msg.client.queue.delete(msg.guild.id);
      });
    }catch{
      client.queue.delete(msg.guild.id);
      return msg.channel.send('An error has occured while rendering audio');
    }
  }
}
async function seek_track(song, msg, sec){
  let queue = msg.client.queue.get(msg.guild.id);
  if(!song){
    queue.voiceChannel.leave();
    msg.client.queue.delete(msg.guild.id);
    return;
  }
  const max_seconds = Math.floor(queue.songs[0].duration), s = parseInt(sec);
  if(s >= max_seconds)return msg.reply({ embed: { description: `The entered value is larger than the song's duration` } });
  if(!msg.guild.me.voice.serverDeaf)msg.guild.me.voice.setDeaf(true);
  queue.songs[0].seek = s;
  const dispatcher = queue.connection
  .play(yt(song, {  'quality': 'highest', 'filter': 'audioonly', seek: s }))
  .on('finish', async () => {
    if(!check_queue(msg)){ msg.client.queue.delete(msg.guild.id); return; }
    msg.client.prev_song = queue.songs[0];
    if(queue.replay){ queue.replay = false; }
    else { if(!queue.loop)queue.songs.shift(); }
    if(!queue.songs[0] || queue.songs[0] === undefined){
      const song_wait = setInterval(async() => {
        if(!check_queue(msg)){ msg.client.queue.delete(msg.guild.id); clearInterval(song_wait); }
        let q = msg.client.queue.get(msg.guild.id), songs = q.songs;
        if(songs[0] !== undefined){ await start_track(songs[0].url, msg); clearInterval(song_wait); }
      }, 2000);
    }else{ update_ids(msg, queue.songs); await start_track(queue.songs[0].url, msg); }
  })
  .on('error', async err => {
    if(!check_queue(msg)){ msg.client.queue.delete(msg.guild.id); return; }
    if(queue.replay){ queue.replay = false; }
    else { if(!queue.loop)queue.songs.shift(); }
    if(!queue.songs[0] || queue.songs[0] === undefined){
      const song_wait = setInterval(async() => {
        if(!check_queue(msg)){ msg.client.queue.delete(msg.guild.id); clearInterval(song_wait); }
        let q = msg.client.queue.get(msg.guild.id), songs = q.songs;
        if(songs[0] !== undefined){ await start_track(songs[0].url, msg); clearInterval(song_wait); }
      }, 2000);
    }else{ update_ids(msg, queue.songs); await start_track(queue.songs[0].url, msg); }
  });
  dispatcher.setVolume((queue.volume / 100));
}
async function start_track(song, msg){
  let queue = msg.client.queue.get(msg.guild.id);
  if(!song){
    queue.voiceChannel.leave();
    msg.client.queue.delete(msg.guild.id);
    return;
  }
  if(!msg.guild.me.voice.serverDeaf)msg.guild.me.voice.setDeaf(true);
  const dispatcher = queue.connection
  .play(yt(song, {  'quality': 'highest', 'filter': 'audioonly'  }))
  .on('finish', async () => {
    if(!check_queue(msg)){ msg.client.queue.delete(msg.guild.id); return; }
    msg.client.prev_song = queue.songs[0];
    if(queue.replay){ queue.replay = false; }
    else { if(!queue.loop)queue.songs.shift(); }
    if(!queue.songs[0] || queue.songs[0] === undefined){
      const song_wait = setInterval(async() => {
        if(!check_queue(msg)){ msg.client.queue.delete(msg.guild.id); clearInterval(song_wait); }
        let q = msg.client.queue.get(msg.guild.id), songs = q.songs;
        if(songs[0] !== undefined){ await start_track(songs[0].url, msg); clearInterval(song_wait); }
      }, 2000);
    }else{ update_ids(msg, queue.songs); await start_track(queue.songs[0].url, msg); }
  })
  .on('error', async err => {
    if(!check_queue(msg)){ msg.client.queue.delete(msg.guild.id); return; }
    if(queue.replay){ queue.replay = false; }
    else { if(!queue.loop)queue.songs.shift(); }
    if(!queue.songs[0] || queue.songs[0] === undefined){
      const song_wait = setInterval(async() => {
        if(!check_queue(msg)){ msg.client.queue.delete(msg.guild.id); clearInterval(song_wait); }
        let q = msg.client.queue.get(msg.guild.id), songs = q.songs;
        if(songs[0] !== undefined){ await start_track(songs[0].url, msg); clearInterval(song_wait); }
      }, 2000);
    }else{ update_ids(msg, queue.songs); await start_track(queue.songs[0].url, msg); }
  });
  dispatcher.setVolume((queue.volume / 100));
}
function create_queue_embed(msg, song_info){
  const queue_e = new MessageEmbed()
  .setDescription(`Queued ${isArray(song_info) ? `[${song_info[0].playlist_title}](${song_info[0].playlist_url})` : `[${song_info.title}](${song_info.url})`} [${reply(msg.author.id)}]`);
  msg.channel.send(queue_e);
}
function update_ids(msg, songs){
  for(let song of songs){
    song.id -= 1;
  }
  let q = msg.client.queue.get(msg.guild.id);
  q.songs = songs;
}
function check_queue(msg){
  let queue = msg.client.queue.get(msg.guild.id);
  if(!queue || queue === [] || !queue.voiceChannel || !queue.textChannel)return false;
  return true;
}
async function managing_data(client, msg, input){
  if(!input)return null;
  let is_youtube_link = false, is_spotify_link = false;
  if(input.includes('youtube.com') || input.includes('youtu.be'))is_youtube_link = true;
  if(input.includes('open.spotify.com'))is_spotify_link = true;
  const server_queue = client.queue.get(msg.guild.id);
  if(is_youtube_link){
    if(input.includes('list')){
      const is_valid = yt.validateURL(input);
      if(is_valid)return null;
      const id_of_playlist = input.split('list')[1].replace('=', ''), playlist = await ply(id_of_playlist, { limit: 20 });
      if(!playlist || !playlist.items || playlist.visibility !== 'everyone')return null;
      const songs = [];
      let i = server_queue ? server_queue.songs.length : 0;
      for(const item of playlist.items){
        const basic_info = await yt.getBasicInfo(item.url);
        if(!basic_info)return null;
        const title = basic_info.videoDetails.title, duration = basic_info.videoDetails.lengthSeconds, view_count = basic_info.videoDetails.viewCount, data = { title: title, view_count: view_count, duration: duration, url: basic_info.videoDetails.video_url, playlist_title: playlist.title, playlist_url: playlist.url, seek: 0, id: i }
        songs.push(data);
        i++;
      }
      return songs;
    }else{
      const is_valid = yt.validateURL(input);
      if(is_valid)return null;
      const basic_info = await yt.getBasicInfo(input);
      if(!basic_info)return null;
      const title = basic_info.videoDetails.title, duration = basic_info.videoDetails.lengthSeconds, view_count = basic_info.videoDetails.viewCount; // audio = yt(input, { 'quality': 'highest', 'filter': 'audioonly' }).pipe(fs.createWriteStream(`./songs/${title.split(/ +/).join('_')}.mp3`));
      const return_data = {
        title: title,
        view_count: view_count,
        duration: duration,
        url: basic_info.videoDetails.video_url,
        seek: 0,
        id: server_queue ? server_queue.songs.length : 0
      }
      return return_data;
    }
  }else if(is_spotify_link){
    const data = await getPreview(input);
    if(!data)return null;
    const search_results = await sr(`${data.artist} - ${data.title}`, {pages: 1, limit: 2});
    if(!search_results)return null;
    const id = server_queue ? server_queue.songs.length : 0, url = search_results.items[0].url, is_valid = yt.validateURL(url);
    if(!is_valid)return null;
    const basic_info = await yt.getBasicInfo(search_results.items[0].url); 
    if(!basic_info)return null; 
    const title = basic_info.videoDetails.title, duration = basic_info.videoDetails.lengthSeconds, view_count = basic_info.videoDetails.viewCount; // audio = yt(url, { 'quality': 'highest', 'filter': 'audioonly' }).pipe(fs.createWriteStream(`./songs/${title.split(/ +/).join('_')}.mp3`));
    const return_data = {
      title: title,
      view_count: view_count,
      duration: duration,
      url: url,
      seek: 0,
      id: id
    }
    return return_data;
  }else{
    if(!input)return null;
    const search_results = await sr(input, {pages: 1, limit: 2});
    if(!search_results)return null;
    const url = search_results.items[0].url;
    if(url.includes('/c/') || url.includes('/user/') || url.includes('/channel/'))return null;
    if(!url.includes('list')){
      const id = server_queue ? server_queue.songs.length : 0;
      const basic_info = await yt.getBasicInfo(url); 
      if(!basic_info)return null; 
      const title = basic_info.videoDetails.title, duration = basic_info.videoDetails.lengthSeconds, view_count = basic_info.videoDetails.viewCount; // audio = yt(url, { 'quality': 'highest', 'filter': 'audioonly' }).pipe(fs.createWriteStream(`./songs/${title.split(/ +/).join('_')}.mp3`));
      const return_data = {
        title: title,
        view_count: view_count,
        duration: duration,
        url: url,
        seek: 0,
        id: id
      }
      return return_data;
    }else{
      const id_of_playlist = url.split('list')[2].replace('=', ''), playlist = await ply(id_of_playlist, { limit: 20 });
      if(!playlist || playlist.visibility !== 'everyone' || !playlist.items)return null;
      const songs = [];
      let i = server_queue ? server_queue.songs.length : 0;
      for(const item of playlist.items){
        const basic_info = await yt.getBasicInfo(item.url);
        if(!basic_info)return null;
        const data = { id: i, title: basic_info.videoDetails.title, view_count: basic_info.videoDetails.viewCount, duration: basic_info.videoDetails.lengthSeconds, url: basic_info.videoDetails.video_url, playlist_url: playlist.url, seek: 0, playlist_title: playlist.title };
        songs.push(data);
        i++;
      }
      return songs;
    }
  }
}
const shortcode = (n) => {
  const possible = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz0123456789'
  let text = ''
  for (var i = 0; i < n + 1; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text;
}

module.exports.seek_track = seek_track;
