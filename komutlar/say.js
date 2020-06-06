const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (message.author.bot || message.channel.type === "dm") return;
  let tag = "ʀ";
  var tagdakiler = 0;

  message.guild.members.forEach(member => {
    if (member.user.username.includes(tag)) {
      tagdakiler = tagdakiler + 1;
    }
  });
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  let count = 0;

  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  const emoji = client.emojis.find(emoji => emoji.name === "tik");
  const arrifentembed = new Discord.RichEmbed()
    .setTitle("🇷 Riorwor Üye Listesi")
    .setDescription(`<a:tac:711324362728538183> Ses kanallarında **${count}** kişi bulunmaktadır.\n <a:tac:711324362728538183> Sunucuda **${message.guild.memberCount}** kişi bulunmaktadır.\n <a:tac:711324362728538183> Tagda **${tagdakiler}** kişi bulunmaktadır.`)
    .setColor("RED")
  message.channel.send(arrifentembed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say"],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "Kullanıcıları sayar.",
  usage: "/say"
};