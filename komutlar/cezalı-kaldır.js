const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../util/Util.js');

exports.run = (client, message, args) => {

if (message.member.roles.has('711241863155417089')) {
  let kisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kisi) return message.reply(`<a:nlm:711324362627743815> Lütfen <@&711241863155417092> rolünü **kaldırmam** için birini etiketleyin!`);
  if(kisi.roles.has('711241863155417092')) {
       kisi.removeRoles(kisi.roles);
    setTimeout(function(){
      kisi.addRole("711241862781992964");
    message.reply(`<:tik:711324362732732526> ${kisi} adlı kullanıcının **başarıyla** <@&711241863155417092> rolü kaldırıldı!`).then(m => m.delete(5000));
 }, 600);
      } else {
      return message.reply("Bu kişinin *<@&711241863155417092> rolü bulunmamaktadır!");
     }
  } else {
message.reply("<a:nlm:703726093001162913> Bu komudu kullanmak için yeterli **yetkiye** sahip değilsin!").then(m => m.delete(5000));
    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cezalı-kaldır"],
  permLevel: `0`
};

exports.help = {
  name: 'cezalıkaldır',
  category: 'kullanıcı',
  description: 'Cezalı kaldırma komudu.',
  usage: '/cezalıkaldır <@Kişi>'
};
