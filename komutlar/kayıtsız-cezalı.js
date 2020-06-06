const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../util/Util.js');
const moment = require("moment");
const db = require("quick.db")

exports.run = (client, message, args) => {

      if (message.member.roles.has("711241863163805702")) {
        setTimeout(function(){ 
        message.guild.roles.get("711241862781992964").members.forEach(u => {
        u.removeRole("711241862781992964")
        u.addRole("711241863155417092")
        client.users.get(u.id).send(`<a:nlm:711324362627743815> Uzun süre **'Kayıtsız'** kaldığın için seni <@&711241863155417092> rolüne aktardım! Kayıt yaptırmak için bir **yetkiliye** danışman yeterli!`)
          }, 600);
      })
    let roleID = '711241862781992964';
    let memberCount = message.guild.roles.get(roleID).members.size;
        message.reply(`<a:tac:711324362728538183> ${memberCount} kişi **cezalı** rolüne aktarıldı!`).then(m => m.delete(10000));
      } else {
      message.reply("<a:nlm:711324362627743815> Bu komudu kullanmak için yeterli **yetkiye** sahip değilsin!").then(m => m.delete(5000));
    }
  };



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtsız-cezalı"],
  permLevel: `0`
};

exports.help = {
  name: 'kayıtsızcezalı',
  category: 'kullanıcı',
  description: 'Kayıtsızları cezalıya aktarma komudu.',
  usage: '/kayıtsızcezalı'
};
