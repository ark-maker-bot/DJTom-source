function add_cooldown(cooldown_db, cooldown_seconds, cooldown_user_id){
  if(!cooldown_db || !cooldown_seconds || !cooldown_user_id || cooldown_user_id === process.env.OWNER_ID)return;
  cooldown_db.set(cooldown_user_id);
  setTimeout(() => cooldown_db.delete(cooldown_user_id), cooldown_seconds * 1000);
}
module.exports = {
  add_cooldown
}