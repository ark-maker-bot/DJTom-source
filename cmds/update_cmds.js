require('dotenv').config();
const fs = require('fs');
module.exports = {
  name: 'updatecmds',
  aliases: ['upcmds', 'cmds'],
  description: 'Updates the commands in the bot',
  usage: 'updatecmds',
  async run(client, msg, args){
    if(msg.author.id !== process.env.OWNER_ID)return msg.reply('You aren\'t the owner');
    if(msg.deletable)msg.delete();
    client.cmds.clear();
    const files = fs.readdirSync('./cmds/').filter(file => file.endsWith('.js'));
    for(const file of files){
      const cmd = require(`./${file}`);
      client.cmds.set(cmd.name, cmd);
      if(cmd.aliases.length > 0)for(const alias of cmd.aliases)client.cmds.set(alias, cmd);
    }
    (await client.users.fetch(process.env.OWNER_ID, false, true)).send('Commands have been updated');
  }
}