let toHHMMSS = (secs) => {
  let sec_num = parseInt(secs, 10), hours = Math.floor(sec_num / 3600), minutes = Math.floor(sec_num / 60) % 60, seconds = sec_num % 60
  return [hours,minutes,seconds].map(v => v < 10 ? "0" + v : v).filter((v,i) => v !== "00" || i > 0).join(":");
};
module.exports = toHHMMSS;