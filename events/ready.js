const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`BOT: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);

   var oyun = [
        "💡 /yardım", 
        "⚡ Riorwor Bot",
        "💥 Coded by Enes Emre Mercan",
        "🤖 7/24 Online",
        ""
  
    ];22

    setInterval(function() {

        var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
        client.user.setStatus("dnd");
        client.user.setActivity(oyun[random]);
        }, 2 * 2500);
}