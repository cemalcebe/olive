const Discord = require('discord.js');

exports.run = (client, message) => {
      const random = Math.floor(Math.random() * 100) + 1
      message.reply(`<a:cooldoge:711324365039468605> Efkar Seviyen |  **%${random}**    🚬 `)
   } 
 
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
}

exports.help = {
 name: 'efkarım',
 description: 'Efkar ölç',
 usage: 'Efkar ölç'
};