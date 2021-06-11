require('dotenv').config();
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'penisrate',
  aliases: ['penis', 'pr', 'howpenis'],
  description: 'Shows the penis size of a user',
  usage: 'penisrate',
  async run(client, msg, args){
    let penis_length = Math.floor(Math.random() * 11), penis = '8';
    if(msg.author.id === process.env.OWNER_ID)penis_length = 11;
    for(let i = 0; i <= penis_length; i++)if(i < penis_length)penis += '=';else penis += 'D';
    const pr = new MessageEmbed()
    .setTitle(`Penis rating machine`)
    .setColor('BLUE')
    .setDescription(`${msg.author.username}'s penis is ${penis}`)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true, size: 128 }));
    msg.channel.send(pr);
  }
}