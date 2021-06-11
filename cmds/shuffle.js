module.exports = {
  name: 'shuffle',
  aliases: ['s'],
  description: 'Shuffle song playlist',
  usage: 'shuffle',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    let server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to resume`);
    let songs = server_queue.songs;
    const first_song = songs[0], shuffle_songs = songs.filter(song => song.id !== 0), new_songs = [];
    shuffle(shuffle_songs);
    new_songs.push(first_song);
    for(const song of shuffle_songs){
      new_songs.push(song);
    }
    server_queue.songs = new_songs;
    return msg.react('👌');
    // return msg.channel.send({ embed: { description: `Songs have been shuffled | If you want to see use ?queue [<@!${msg.author.id}>]` } });
  }
}
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}