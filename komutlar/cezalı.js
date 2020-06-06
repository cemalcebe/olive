const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../util/Util.js');
const moment = require("moment");

exports.run = (client, message, args) => {
  let kisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

      if (message.member.roles.has("711241863155417089")) {

         if (!kisi) return message.reply(`<a:nlm:711324362627743815> Lütfen <@&711241863155417092> rolünü **vermem** için birini etiketleyin!`);
      if (kisi.roles.has('711241863155417092')) return message.reply("<a:nlm:711324362627743815> Bu kişiye <@&711241863155417092> rolünü veremezsin!");

                     kisi.removeRoles(kisi.roles);
        setTimeout(function(){
             kisi.addRole("711241863155417092");
    message.reply(`<:tik:711324362732732526> ${kisi} adlı kullanıcı **başarıyla** <@&711241863155417092> rolüne aktarıldı!`).then(m => m.delete(5000));
}, 700);

      } else {
      message.reply("<a:nlm:711324362627743815> Bu komudu kullanmak için yeterli **yetkiye** sahip değilsin!").then(m => m.delete(5000));
    }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cezalı-ver"],
  permLevel: `0`
};

exports.help = {
  name: 'cezalı',
  category: 'kullanıcı',
  description: 'Cezalı komudu.',
  usage: '/cezalı <@Kişi>'
};
