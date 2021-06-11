// https://discord.com/oauth2/authorize?client_id=790023034613661716&scope=bot&permissions=1085402281
module.exports = {
  name: 'invite',
  aliases: ['i'],
  description: 'Sends an invite url for the bot',
  usage: 'invite',
  async run(client, msg, args){
    const invite = 'https://discord.com/oauth2/authorize?client_id=790023034613661716&scope=bot&permissions=1085402281'
    msg.react('👌');
    msg.member.send({ embed: { description: `Here is the [invite](${invite}) url` } }); 
  }
}