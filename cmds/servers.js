module.exports = {
  name: 'servers',
  aliases: ['svs'],
  description: 'Shows the amount of servers that the bot is in',
  usage: 'servers',
  async run(client, msg, args){
    msg.channel.send({ embed: { description: `I'm in ${msg.client.guilds.cache.size} rehab centres` } });
  }
}