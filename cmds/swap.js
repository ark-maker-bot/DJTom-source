module.exports = {
  name: 'swap',
  aliases: [],
  description: 'Swaps the selected song to another position',
  usage: 'swap <id_of_song_to_swap> <id_of_song_to_swap_to>',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    let server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to resume`);
    let songs = server_queue.songs, id_1 = args[0], id_2 = args[1];
    if(!id_1)return msg.reply(`You didn't mention an ID`);
    if(id_1 > songs.length+1 || id_1 < 0 || id_1 === 1)return msg.reply(`You have entered an ID too high or too low`);
    if(!id_2)return msg.reply(`You didn't mention an ID`);
    if(id_2 > songs.length+1 || id_2 < 0 || id_2 === 1)return msg.reply(`You have entered an ID too high or too low`);
    let song_to_swap = songs[id_1-1], song_to = songs[id_2-1];
    // let song_to_swap = songs.filter(item => item.id !== id-1), song_to = songs.filter(item => item.id !== id-1);
    songs[id_2-1] = song_to_swap;
    songs[id_1-1] = song_to;
    msg.channel.send({ embed: { description: `Successfully swapped [${songs[id_2-1].title}](${songs[id_2-1].url}) with [${songs[id_1-1].title}](${songs[id_1-1].url}) [<@!${msg.author.id}>]` } });
    server_queue.songs = songs;
    if(id-1 === 0 && songs.length < 1)server_queue.connection.dispatcher.end();
  }
}