require('dotenv').config();
const { Client, Collection } = require('discord.js'), client = new Client(), fs = require('fs');
const cooldown = new Collection(), files = fs.readdirSync('./cmds/').filter(file => file.endsWith('.js')), { add_cooldown } = require('./other/cooldown');
client.cmds = new Collection();
for(const file of files){
  const cmd = require(`./cmds/${file}`);
  client.cmds.set(cmd.name, cmd);
  if(cmd.aliases.length > 0)for(const alias of cmd.aliases)client.cmds.set(alias, cmd);
}
client.queue = new Collection();
client.on('ready', () => { client.prefix = '+'; console.log(`${client.user.username} is now online`); client.user.setActivity('@DJ Tom', { type: 'LISTENING' }) });
client.on('message', async(msg) => {
  if(msg.author.bot)return;
  let prefix = '+';
  if(msg.content.toLowerCase() === `<@!${client.user.id}>`)return msg.reply( { embed: { description: `If you want commands you could use the command ${prefix}help` } } );
  if(msg.content.startsWith('?') && !msg.content.startsWith('+') && !msg.content.startsWith('='))prefix = '?';
  if(msg.content.startsWith('=') && !msg.content.startsWith('+') && !msg.content.startsWith('?'))prefix = '=';
  if(!msg.content.startsWith(prefix))return;
  const args = msg.content.slice(prefix.length).split(/ +/), command = args.shift().toLowerCase();
  if(!client.cmds.has(command))return;
  if(cooldown.has(msg.author.id))return msg.reply(`You are currently on cooldown, Please wait`);
  // if(msg.deletable)msg.delete();
  try{
    add_cooldown(cooldown, 3, msg.author.id);
    client.cmds.get(command).run(client, msg, args);
  }catch{
    msg.reply(`Something has happened and I didn't like it`);
  }
});
client.on('voiceStateUpdate', async(old_state, new_state) => {

  // checks if dj tom is the only on in the voice channel if so he leaves after 5 minutes.
  let old_channel = old_state.channel, new_channel = new_state.channel;
  if(new_channel === null)setTimeout(() => { if(old_channel.members.size === 1 && old_channel.members.has(client.user.id)){ const q = old_state.client.queue.get(old_state.guild.id); q.textChannel.send({ embed: { description: `Yeah, I was in the voice channel alone so I left, I guess I'm not fun.` } }); old_channel.leave(); } }, 1000*60*5);

  // checks deafen state, then server deafens
  if(new_state.member.id === client.user.id && !new_state.serverDeaf){
    let q = client.queue.get(new_state.guild.id);
    if(!q)return;
    await new_state.member.voice.setDeaf(true);
    q.textChannel.send({ embed: { description: `You aren't allowed to undeafen me. This helps with saving resources.` } });
  }
});
client.login(process.env.TOKEN);
