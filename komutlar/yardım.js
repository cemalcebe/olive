const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (client, message, args) => {
  const onlyembed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('📌 Yardım Menüsü')
    .setDescription('• **/sevgiölçer [@Kullanıcı]** | Kişiye olan aşkını ölçer.\n\n• **/düello [@Kullanıcı]** | Kişiye düello atar.\n\n• **/hapishane** | Profilinize hapishane efekti ekler.\n\n• **/rip** | Profilinize RIP efekti ekler.\n\n• **/efkarım** | Efkar seviyenizi ölçer.\n\n• **/sor** | Botun yapay zekasına soru sorarsınız.\n\n• **/say** | Sunucudaki kişi sayısını gösterir.\n\n');
    message.channel.send(onlyembed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cmd", "y", "h"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "yardım komudu",
  usage: "yardım"
};
