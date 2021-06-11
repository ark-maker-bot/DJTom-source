const superagent = require('superagent');
module.exports = {
  name: 'masturbation',
  aliases: ['m', 'mas'],
  description: 'Sends you some random porn picture',
  usage: 'masturbation',
  async run(client, msg, args){
    if(!msg.channel.nsfw)return; const types = ['ass', 'anal', 'pussy', '4k'], type = types[Math.floor(Math.random() * types.length)], { body } = await superagent.get(`https://nekobot.xyz/api/image?type=${type}`), pic = body.message, vid = isAnimated(pic);
    if(!pic)return msg.channel.send(`Failed to get picture... `);
    vid === false ? msg.member.send({ embed: { image: { url: pic } } }).catch(err => { return msg.channel.send(`I can't message that user`); }) : msg.member.send(pic).catch(err => { return msg.channel.send(`I can't message that user`); });
    msg.react('🤤');
  }
}
function isAnimated(string){
  const videoFormats = ['gif','webm','mp4'];
  for(const format of videoFormats){
    if(string.includes(format))return true;
  }
  return false;
}