const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'hotrate',
  aliases: ['hot', 'hr', 'howhot'],
  description: 'Shows how hot of a user is',
  usage: 'hotrate',
  async run(client, msg, args){
    const hotrate = Math.floor(Math.random() * 101);
    const hr = new MessageEmbed()
    .setTitle(`Hot rating machine`)
    .setColor('BLUE')
    .setDescription(`${msg.author.username}'s is ${hotrate}% hot`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 128 }));
    msg.channel.send(hr);
  }
}