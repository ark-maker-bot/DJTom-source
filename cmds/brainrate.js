const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'brainrate',
  aliases: ['brain', 'br', 'howbrain'],
  description: 'Shows how brain (yes) a user is',
  usage: 'brainrate',
  async run(client, msg, args){
    const brainrate = Math.floor(Math.random() * 101);
    const br  = new MessageEmbed()
    .setTitle(`Brain size rating machine`)
    .setColor('BLUE')
    .setDescription(`${msg.author.username}'s brain is ${brainrate}"`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 128 }));
    msg.channel.send(br);
  }
}