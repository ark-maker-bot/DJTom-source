require('dotenv').config();
const Genius = require('genius-lyrics'), Lyrics = require('song-lyrics-api'), { getLyrics } = new Lyrics(), g = new Genius.Client('rJb16gdZvaD2yctSn0PyFi10TwYXz0Rry0LAyjiA_TBDPMJoG5mR7yHGKUJ4LyGi');
module.exports = {
  name: 'lyrics',
  aliases: ['ly'],
  description: 'Shows the lyrics of the current song',
  usage: 'lyrics',
  async run(client, msg, args){
    if(!msg.member.voice.channel)return msg.reply(`You aren't in a voice channel`);
    const server_queue = client.queue.get(msg.guild.id);
    if(!server_queue || !server_queue.songs)return msg.reply(`There aren't any songs to resume`);
    const song = server_queue.songs[0].title;
    g.songs.search(song).then(async search => {
      const lyrics = await search[0].lyrics(true);
      msg.channel.send({ embed: { title: `Lyrics for ${search[0].title}`, description: `${lyrics.length > 2048 ? `A little problem, character limit has been reached\nSo, if you want the lyrics you would use this [${search[0].featuredTitle}](${search[0].url})` : lyrics}`, thumbnail: { url: search[0].image } } });
    }).catch(err => {
      getLyrics(song).then(lyrics => {
        if(!lyrics || lyrics === [] || lyrics[0] === undefined)return msg.channel.send({ embed: { description: `Couldn't find lyrics for ${song}` } });
        console.log(lyrics);
        msg.channel.send({ embed: { title: `Lyrics for ${song}`, description: `${lyrics.length > 2048 ? `A little problem, character limit has been reached\nSo, if you want the lyrics you would use this ${song}` : lyrics.join(' ')}` } });
      }).catch(err => {
        msg.channel.send({ embed: { description: `Couldn't find lyrics for ${song}` } });
      });
    });
  }
}