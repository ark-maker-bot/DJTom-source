const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'gayrate',
  aliases: ['gay', 'gm', 'gr', 'howgay'],
  description: 'Shows the gay rate of a user',
  usage: 'gayrate',
  async run(client, msg, args){
    const gay_amount = Math.floor(Math.random() * 101);
    const gr = new MessageEmbed()
    .setTitle(`Gay rating machine`)
    .setColor('BLUE')
    .setDescription(`${msg.author.username} is ${gay_amount}% gay`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 128 }));
    msg.channel.send(gr);
  }
}