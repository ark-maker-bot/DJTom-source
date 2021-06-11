module.exports = {
  name: 'back',
  aliases: ['b'],
  description: 'Removes the selected song to the back of the playlist',
  usage: 'back <id of song>',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    let server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to resume`);
    let songs = server_queue.songs, id = args[0];
    if(!id)return msg.reply(`You didn't mention an ID`);
    if(id > songs.length+1 || id < 0)return msg.reply(`You have entered an ID too high or too low`);
    let song = songs.filter(item => item.id === id-1);
    songs = songs.filter(item => item.id !== id-1);
    songs.push(song);
    msg.channel.send({ embed: { description: `Successfully moved [${song.title}](${song.url}) to the back [<@!${msg.author.id}>]${id-1 === 0 && songs.length < 1 ? '\nThere aren\'t any more songs to play' : ''}` } });
    server_queue.songs = songs;
  }
}