const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'racistrate',
  aliases: ['racist', 'rr', 'howracist'],
  description: 'Shows how racist of a user is',
  usage: 'racistrate',
  async run(client, msg, args){
    const racistrate = Math.floor(Math.random() * 101);
    const rr = new MessageEmbed()
    .setTitle(`Racist rating machine`)
    .setColor('BLUE')
    .setDescription(`${msg.author.username}'s is ${racistrate}% racist`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 128 }));
    msg.channel.send(rr);
  }
}