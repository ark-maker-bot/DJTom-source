const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'simprate',
  aliases: ['simp', 'sm', 'sr', 'howsimp'],
  description: 'Shows the simp rate of a user',
  usage: 'simprate',
  async run(client, msg, args){
    const simp_amount = Math.floor(Math.random() * 101);
    const sr = new MessageEmbed()
    .setTitle(`Simp rating machine`)
    .setColor('BLUE')
    .setDescription(`${msg.author.username} is ${simp_amount}% a simp`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 128 }));
    msg.channel.send(sr);
  }
}