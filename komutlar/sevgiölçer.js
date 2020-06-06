const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    let member = message.guild.member(message.mentions.users.array()[0] || message.guild.members.get(args[0]))
    let member2 = message.guild.member(message.mentions.users.array()[1] || message.guild.members.get(args[1]))
    var s = message.author
    if(member2) {
        var s = member2.user
    }
    if(!member) {
return message.reply("Lütfen sana olan aşkını ölçmesi için birini etiketle!")
    }
    var anasonuc = Math.floor(Math.random() * 101)
    var kalp = ''
    var akalp = ''
    if(Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
        var c = 0
        for(var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
            kalp += '❤️'
            c++
        }
        for(var x = c; x < 10; x++) {
            akalp += `🖤`
        }
    } else {
        var kalp = '🖤'
        var akalp = '🖤🖤🖤🖤🖤🖤🖤🖤🖤'
    }
    var yorum = 'Bence derhal evlenmelisiniz!'
    if(anasonuc < 80) {
        var yorum = 'Çok yakınsınız!'
    }
    if(anasonuc < 60) {
        var yorum = 'Seni arkadaş olarak seviyor.'
    }
    if(anasonuc < 40) {
        var yorum = 'Seni seviyor denemez.'
    }
    if(anasonuc < 20) {
        var yorum = 'Seni hiç sevmiyor.'
    }
    const embed = new Discord.RichEmbed()
        .setDescription(`**Sevgi Yüzdesi** | ${anasonuc}\n${kalp}${akalp}\n${yorum}`)
        .setColor("RED")
    message.channel.send({embed})
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sevgi-ölçer', 'sevgi-olcer', 'sevgiolcer'],
    permLevel: 0
}
exports.help = {
    name: 'sevgiölçer',
    description: 'İki Kullanıcı Arasındaki Aşkı Ölçer.',
    usage: 'sevgiölçer [@Kullanıcı]'
}