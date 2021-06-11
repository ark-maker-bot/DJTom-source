const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'slaverate',
  aliases: ['slave', 'slr', 'slm', 'howslave'],
  description: 'Shows the slave rate of a user',
  usage: 'slaverate',
  async run(client, msg, args){
    const slave_amount = Math.floor(Math.random() * 101);
    const slr = new MessageEmbed()
    .setTitle(`Slave rating machine`)
    .setColor('BLUE')
    .setDescription(`${msg.author.username} is ${slave_amount}% a slave`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 128 }));
    msg.channel.send(slr);
  }
}