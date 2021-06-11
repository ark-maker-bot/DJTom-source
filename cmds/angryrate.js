const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'angryrate',
  aliases: ['angry', 'ar', 'howangry'],
  description: 'Shows how angry a user is',
  usage: 'angryrate',
  async run(client, msg, args){
    const angryrate = Math.floor(Math.random() * 101);
    const ar = new MessageEmbed()
    .setTitle(`Angry rating machine`)
    .setColor('BLUE')
    .setDescription(`${msg.author.username}'s is ${angryrate}% angry`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 128 }));
    msg.channel.send(ar);
  }
}