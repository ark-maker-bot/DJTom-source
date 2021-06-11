module.exports = {
  name: 'members',
  aliases: ['mems'],
  description: 'Shows the amount of members that the bot can see',
  usage: 'members',
  async run(client, msg, args){
    let total_members = 0; msg.client.guilds.cache.each(guild => total_members += guild.memberCount);
    msg.channel.send({ embed: { description: `I'm staring at ${total_members} people around the world...` } });
  }
}