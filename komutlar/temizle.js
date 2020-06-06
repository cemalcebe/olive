const Discord = require('discord.js');

exports.run = function(client, message, args) {
    let bs = args.slice(0).join('+');

  let id = Number(args[0]);



    if(isNaN(id)) return message.reply("<a:carpi:711337252210606160> Lütfen bir **rakam** girin!")
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("<a:carpi:711337252210606160> Bu komutu kullanmak için **Mesajları Yönet** yetkisine sahip olman gerekiyor!");
if(args[0] > 100) return message.reply("<a:carpi:711337252210606160> Maksimum **100** mesaj silebilirim!");
message.channel.bulkDelete(`${args[0]}`, (err) => {
                message.reply("<a:carpi:711337252210606160> **14 günden** eski mesajları silemem! Veya **yetkim yok!**").then(msg => msg.delete(10000)); 
            })
message.channel.send(`<a:onaylandi_riorwor:711337107746193489> ${args[0]} Adet mesaj **başarıyla** silindi!`).then(msg => msg.delete(10000));
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil','süpür','temiz'],
  permLevel: 3
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'temizle <silinicek mesaj sayısı>'
};
