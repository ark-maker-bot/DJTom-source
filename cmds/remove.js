module.exports = {
  name: 'remove',
  aliases: ['delete'],
  description: 'Removes a song with the song title or id',
  usage: 'remove <song_title / id>',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    let server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to resume`);
    let songs = server_queue.songs, search = args.slice(0).join(' ');
    if(!search)return msg.reply(`You didn't mention any SEARCH_TERM`);
    let num = parseInt(search) - 1;
    if(Number.isInteger(num)){
      if(songs[0].id === num)return msg.reply(`You mentioned the current track that's playing therefore stopped`);
      const s = songs.filter(song => song.id === num)[0];
      songs = songs.filter(song => song.id !== num);
      if(!s)msg.channel.send({ embed: { description: `Couldn't find a song with ${num} in the id [<@!${msg.author.id}>]` } });
      else msg.channel.send({ embed: { description: `Successfully removed [${s.title}](${s.url}) [<@!${msg.author.id}>]` } });
      server_queue.songs = songs;
    }else{
      if(songs[0].title.toLowerCase().includes(search))return msg.reply(`You mentioned the current track that's playing therefore stopped`);
      const s = songs.filter(song => song.title.toLowerCase().includes(search))[0];
      songs = songs.filter(song => !song.title.toLowerCase().includes(search));
      if(!s)msg.channel.send({ embed: { description: `Couldn't find a song with ${search} in the title [<@!${msg.author.id}>]` } });
      else msg.channel.send({ embed: { description: `Successfully removed [${s.title}](${s.url}) [<@!${msg.author.id}>]` } });
      server_queue.songs = songs;
    }
  }
}