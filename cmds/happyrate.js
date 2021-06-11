const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'happyrate',
  aliases: ['happy', 'hpr', 'howhappy'],
  description: 'Shows how happy a user is',
  usage: 'happyrate',
  async run(client, msg, args){
    const happyrate = Math.floor(Math.random() * 101);
    const hpr = new MessageEmbed()
    .setTitle(`Happy rating machine`)
    .setColor('BLUE')
    .setDescription(`${msg.author.username}'s is ${happyrate}% happy`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 128 }));
    msg.channel.send(hpr);
  }
}