const complete_msg = `Thank you for agreeing to the rules and code of conduct! You are now a verified member of {name}! \nFeel free to choose what roles you’d like, introduce yourself or check out a our other channels. \n\n**Your unique token is your signature that you have read and understood our rules.**\n`
const short_code = (n) => {
  const possible = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz0123456789'
  let text = ''
  for (var i = 0; i < n + 1; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text;
}
function v(client){
  client.on('guildMemberAdd', async(member) => {
    const t = short_code(10), welcome_msg = `Welcome to the ${member.guild.name}! We hope you find a home here! Check out the \`#general\` channel to make sure that we jive, and as long as our goals are similar, then there’s a place at the table waiting for you. \n\n If you accept the code of conduct, please verify your agreement by replying to **this DM** with the verification phrase: \n\n\`${t}\`\n\n **This message is case-sensitive! You will have one hour to verify or you will be kicked**`;
    member.send(welcome_msg);
    member.user.token = t;
    complete_msg.replace('{name}', member.guild.name);
  });
  const verify_msg = '{name}';
  client.on('message', async(message) => {
    if(message.author.bot || !message.user.token || message.channel.type !== 'dm')return;
    if(message.content !== (verify_msg.replace('{name}', message.author.token)))return;
    message.channel.send({
      embed: {
        color: 'BLUE',
        description: complete_msg,
        timestamp: new Date(),
        footer: {
          text: `✔️ Verification Success`
        }
      }
    });
    (await client.guilds.fetch('697177572920000693', {cache: false, force: true})).member(message.author).roles.add('733838178162704405');
  });
}
module.exports = v;