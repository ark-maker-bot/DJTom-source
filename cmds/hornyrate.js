const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'hornyrate',
  aliases: ['horny', 'hyr', 'howhorny'],
  description: 'Shows how horny of a user is',
  usage: 'hornyrate',
  async run(client, msg, args){
    const hornyrate = Math.floor(Math.random() * 101);
    const hyr = new MessageEmbed()
    .setTitle(`Horny rating machine`)
    .setColor('BLUE')
    .setDescription(`${msg.author.username}'s is ${hornyrate}% horny`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 128 }));
    msg.channel.send(hyr);
  }
}