const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'slutrate',
  aliases: ['slut', 'str', 'howslut'],
  description: 'Shows how slutty the user is',
  usage: 'slutrate',
  async run(client, msg, args){
    let slutrate = Math.floor(Math.random() * 101);
    const str = new MessageEmbed()
    .setTitle(`Slut rating machine`)
    .setColor('BLUE')
    .setDescription(`${msg.author.username}'s is ${slutrate}% a slut`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 128 }));
    msg.channel.send(str);
  }
}