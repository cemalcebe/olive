const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (message.author.bot || message.channel.type === "dm") return;
  let tag = "✧";
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
      let roleID = '711241863155417092';
    let memberCount = message.guild.roles.get(roleID).members.size;
  if (message.member.roles.has("711241863163805702")) {
  const arrifentembed = new Discord.RichEmbed()
    .setTitle("🇷 Riorwor Cezalı Listesi")
    .setDescription(`<a:tac:711324362728538183> Cezalı rolünde **${memberCount}** kişi bulunmaktadır!`)
    .setColor("RED")
  message.channel.send(arrifentembed);
    } else {
      message.reply("<a:nlm:711324362627743815> Bu komudu kullanmak için yeterli **yetkiye** sahip değilsin!").then(m => m.delete(5000));
    }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cezalısay"],
  permLevel: 0
};

exports.help = {
  name: "cezalı-say",
  description: "Cezalı kullanıcıları sayar.",
  usage: "/cezalısay"
};