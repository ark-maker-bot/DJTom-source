module.exports = {
  name: 'uptime',
  aliases: ['upt', 'up'],
  description: 'Shows the total uptime the bot has been online',
  usage: 'uptime',
  async run(client, msg, args){
	  msg.channel.send({
      embed: {
        description: `${secondsToTimeV2(client.uptime / 1000)} [<@!${msg.author.id}>]`
      }
    });
  }
}
function secondsToTimeV2(secs) {
  secs = Math.round(secs);
  let days = Math.floor(secs / 60 / 60 / 24), hours = Math.floor(secs / 60 / 60) % 24, minutes = Math.floor(secs / 60) % 60, seconds = secs % 60, obj = { "d": days, "h": hours, "m": minutes, "s": seconds };
  let time = '';
  if(obj.d)time += `${obj.d}${obj.d === 1 ? ' day' : 'days'} `;
  if(obj.h)time += `${obj.h}${obj.h === 1 ? ' h' : ' hrs'} `;
  if(obj.m)time += `${obj.m} m `;
  if(obj.s)time += `${obj.s} s`; 
  return time;
}