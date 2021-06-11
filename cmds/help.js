const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Shows the help page',
  usage: 'help [command name]',
  async run(client, msg, args){
    if(!args[0]){
      let commands = [];
      const files = client.cmds.filter((cmd, name) => cmd.name === name).array();
      for(const cmd of files){
        if(!nsfw_check(cmd.name))commands.push('`' + `${cmd.name}` + '`');
      }
      const help_e = new MessageEmbed()
      .setTitle(`Help page | Prefix: ${client.prefix} (${files.length})`)
      .setColor('BLUE')
      .setDescription(`**Commands:**\n${commands.join(', ')}`)
      .setTimestamp()
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }));
      msg.channel.send(help_e);
    }else{
      const command = args[0].toLowerCase();
      if(command === 'nsfw'){
        let commands = [];
        const files = client.cmds.filter((cmd, name) => cmd.name === name).array();
        for(const cmd of files){
          if(nsfw_check(cmd.name))commands.push('`' + `${cmd.name}` + '`');
        }
        const help_e = new MessageEmbed()
        .setTitle(`Help page NSFW | Prefix: ${client.prefix} (${files.length})`)
        .setColor('BLUE')
        .setDescription(`**Commands:**\n${commands.join(', ')}`)
        .setTimestamp()
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }));
        msg.channel.send(help_e);
      }else if(msg.client.cmds.has(command)){
        const cmd = msg.client.cmds.get(command);
        const aliases_formatted = [];
        cmd.aliases.forEach(alias => aliases_formatted.push('`'+alias+'`'));
        return msg.channel.send({ embed: { description: `${'`'+cmd.name+'`'} - ${cmd.aliases.join(', ') === '' ? '`No aliases`' : aliases_formatted.join(', ')}\n${cmd.description}\n${client.prefix}${cmd.usage}` } });
      }else return msg.channel.send({ embed: { description: `${command} help page doesn't exist.` } });
      // if(!msg.client.cmds.has(command))return msg.channel.send({ embed: { description: `${command} help page doesn't exist.` } });
    }
  }
}
function nsfw_check(cmd_name){
	const names = ['hornyrate', 'masturbation', 'gayrate', 'racistrate', 'slaverate', 'slutrate', 'penisrate'];
	if(names.includes(cmd_name))return true;
	return false;
}