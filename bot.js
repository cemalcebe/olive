const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
const fs = require("fs");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const db = require("quick.db");
require("./util/eventLoader.js")(client);
const path = require("path");
const snekfetch = require("snekfetch");
const request = require("request");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

//-----------------------------------------------\\
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log("Riorwor | Hostlandı");
  response.sendStatus(200);
});
app.listen(8000);
setInterval(() => {
  http.get(`http://riorworbot.glitch.me/`);
}, 280000);
//-----------------------------------------------\\

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//-----------------------KOMUTLAR-----------------------\\

client.on("guildMemberUpdate", (oldMember, newMember) => {

 if (oldMember.roles.size < newMember.roles.size) {
   if (oldMember.roles.has('711241863125794819')) {
   }
   else{
if (newMember.roles.has('711241863125794819')) {
  client.channels.get("711241863876837442").send(`<a:rainbow_heart:711324362577412147> ${newMember}, Artık bir **Riorwor** üyesi! Hoşgeldiniz beyefendi. <a:alkis:711324369124589589>`)
    }
  }
}
});

client.on("guildMemberAdd", async member => {
    if (member.user.username.includes("♆")) {
        member.guild.members.get(`${member.id}`).ban();
        client.channels.get("711241863637762083").send(`<a:nlm:711324362627743815> ${member}, isminin içinde **yasaklı tag** barındırdığı için sunucudan banlandı!` );
  }
});

client.on("userUpdate", async (old, nev) => {
  if(old.username !== nev.username) {  
  if (nev.user.username.includes("♆")) {
        nev.guild.members.get(`${nev.id}`).ban();
        client.channels.get("711241863637762083").send(`<a:nlm:711324362627743815> ${nev}, isminin içinde **yasaklı tag** koyduğu için sunucudan banlandı!` );
  }
  }
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
 if (oldMember.roles.size < newMember.roles.size) {
   if (oldMember.roles.has('711241863125794820')) {
   }
   else {
if (newMember.roles.has('711241863125794820')) {
  client.channels.get("711241863876837442").send(`<a:rainbow_heart:711324362577412147> ${newMember}, Artık bir **Riorwor** üyesi! Hoşgeldiniz hanımefendi. <a:alkis:711324369124589589>`)
}
}
}
});




client.on("voiceStateUpdate", (oldMember, newMember) => {
  // todo create channel
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("➕│1 Kişilik Oda")
  ) {
    newMember.guild
      .createChannel(`🌹» ${newMember.displayName}`, {
        type: "voice",
        parent: newMember.voiceChannel.parent
      })
      .then(cloneChannel => {
                      setTimeout(function(){ 
                      newMember.setVoiceChannel(cloneChannel);
}, 1000);   
        cloneChannel.setUserLimit(1);
      });
  }
  // ! leave
  if (oldMember.voiceChannel != undefined) {
    if (oldMember.voiceChannel.name.startsWith("🌹» ")) {
      if (oldMember.voiceChannel.members.size == 0) {
        oldMember.voiceChannel.delete();
      } else {
        // change name
        let matchMember = oldMember.voiceChannel.members.find(
          x => `🌹» ${x.displayName}` == oldMember.voiceChannel.name
        );
        if (matchMember == null) {
          oldMember.voiceChannel.setName(
            `🌹» ${oldMember.voiceChannel.members.random().displayName}`
          );
        }
      }
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // todo create channel
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("➕│2 Kişilik Oda")
  ) {
    newMember.guild
      .createChannel(`🌹» ${newMember.displayName}`, {
        type: "voice",
        parent: newMember.voiceChannel.parent
      })
      .then(cloneChannel => {
                     setTimeout(function(){ 
                      newMember.setVoiceChannel(cloneChannel);
}, 1000);   
        cloneChannel.setUserLimit(2);
      });
  }
  // ! leave
  if (oldMember.voiceChannel != undefined) {
    if (oldMember.voiceChannel.name.startsWith("🌹» ")) {
      if (oldMember.voiceChannel.members.size == 0) {
        oldMember.voiceChannel.delete();
      } else {
        // change name
        let matchMember = oldMember.voiceChannel.members.find(
          x => `🌹» ${x.displayName}` == oldMember.voiceChannel.name
        );
        if (matchMember == null) {
          oldMember.voiceChannel.setName(
            `🌹» ${oldMember.voiceChannel.members.random().displayName}`
          );
        }
      }
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // todo create channel
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("➕│3 Kişilik Oda")
  ) {
    newMember.guild
      .createChannel(`🌹» ${newMember.displayName}`, {
        type: "voice",
        parent: newMember.voiceChannel.parent
      })
      .then(cloneChannel => {
                      setTimeout(function(){ 
                      newMember.setVoiceChannel(cloneChannel);
}, 1000);   
        cloneChannel.setUserLimit(3);
      });
  }
  // ! leave
  if (oldMember.voiceChannel != undefined) {
    if (oldMember.voiceChannel.name.startsWith("🌹» ")) {
      if (oldMember.voiceChannel.members.size == 0) {
        oldMember.voiceChannel.delete();
      } else {
        // change name
        let matchMember = oldMember.voiceChannel.members.find(
          x => `🌹» ${x.displayName}` == oldMember.voiceChannel.name
        );
        if (matchMember == null) {
          oldMember.voiceChannel.setName(
            `🌹» ${oldMember.voiceChannel.members.random().displayName}`
          );
        }
      }
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // todo create channel
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("➕│4 Kişilik Oda")
  ) {
    newMember.guild
      .createChannel(`🌹» ${newMember.displayName}`, {
        type: "voice",
        parent: newMember.voiceChannel.parent
      })
      .then(cloneChannel => {
                      setTimeout(function(){ 
                      newMember.setVoiceChannel(cloneChannel);
}, 1000);   
        cloneChannel.setUserLimit(4);
      });
  }
  // ! leave
  if (oldMember.voiceChannel != undefined) {
    if (oldMember.voiceChannel.name.startsWith("🌹» ")) {
      if (oldMember.voiceChannel.members.size == 0) {
        oldMember.voiceChannel.delete();
      } else {
        // change name
        let matchMember = oldMember.voiceChannel.members.find(
          x => `🌹» ${x.displayName}` == oldMember.voiceChannel.name
        );
        if (matchMember == null) {
          oldMember.voiceChannel.setName(
            `🌹» ${oldMember.voiceChannel.members.random().displayName}`
          );
        }
      }
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // todo create channel
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("➕│5 Kişilik Oda")
  ) {
    newMember.guild
      .createChannel(`🌹» ${newMember.displayName}`, {
        type: "voice",
        parent: newMember.voiceChannel.parent
      })
      .then(cloneChannel => {
                      setTimeout(function(){ 
                      newMember.setVoiceChannel(cloneChannel);
}, 1000);   

        cloneChannel.setUserLimit(5);
      });
  }
  // ! leave
  if (oldMember.voiceChannel != undefined) {
    if (oldMember.voiceChannel.name.startsWith("🌹» ")) {
      if (oldMember.voiceChannel.members.size == 0) {
        oldMember.voiceChannel.delete();
      } else {
        // change name
        let matchMember = oldMember.voiceChannel.members.find(
          x => `🌹» ${x.displayName}` == oldMember.voiceChannel.name
        );
        if (matchMember == null) {
          oldMember.voiceChannel.setName(
            `🌹» ${oldMember.voiceChannel.members.random().displayName}`
          );
        }
      }
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // todo create channel
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("➕│6 Kişilik Oda")
  ) {
    newMember.guild
      .createChannel(`🥀» ${newMember.displayName}`, {
        type: "voice",
        parent: newMember.voiceChannel.parent
      })
      .then(cloneChannel => {
                     setTimeout(function(){ 
                      newMember.setVoiceChannel(cloneChannel);
}, 1000);   

        cloneChannel.setUserLimit(6);
      });
  }
  // ! leave
  if (oldMember.voiceChannel != undefined) {
    if (oldMember.voiceChannel.name.startsWith("🥀» ")) {
      if (oldMember.voiceChannel.members.size == 0) {
        oldMember.voiceChannel.delete();
      } else {
        // change name
        let matchMember = oldMember.voiceChannel.members.find(
          x => `🥀» ${x.displayName}` == oldMember.voiceChannel.name
        );
        if (matchMember == null) {
          oldMember.voiceChannel.setName(
            `🥀» ${oldMember.voiceChannel.members.random().displayName}`
          );
        }
      }
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // todo create channel
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("➕│7 Kişilik Oda")
  ) {
    newMember.guild
      .createChannel(`🥀» ${newMember.displayName}`, {
        type: "voice",
        parent: newMember.voiceChannel.parent
      })
      .then(cloneChannel => {
                     setTimeout(function(){ 
                      newMember.setVoiceChannel(cloneChannel);
}, 1000);   

        cloneChannel.setUserLimit(7);
      });
  }
  // ! leave
  if (oldMember.voiceChannel != undefined) {
    if (oldMember.voiceChannel.name.startsWith("🥀» ")) {
      if (oldMember.voiceChannel.members.size == 0) {
        oldMember.voiceChannel.delete();
      } else {
        // change name
        let matchMember = oldMember.voiceChannel.members.find(
          x => `🥀» ${x.displayName}` == oldMember.voiceChannel.name
        );
        if (matchMember == null) {
          oldMember.voiceChannel.setName(
            `🥀» ${oldMember.voiceChannel.members.random().displayName}`
          );
        }
      }
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // todo create channel
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("➕│8 Kişilik Oda")
  ) {
    newMember.guild
      .createChannel(`🥀» ${newMember.displayName}`, {
        type: "voice",
        parent: newMember.voiceChannel.parent
      })
      .then(cloneChannel => {
                      setTimeout(function(){ 
                      newMember.setVoiceChannel(cloneChannel);
}, 1000);   

        cloneChannel.setUserLimit(8);
      });
  }
  // ! leave
  if (oldMember.voiceChannel != undefined) {
    if (oldMember.voiceChannel.name.startsWith("🥀» ")) {
      if (oldMember.voiceChannel.members.size == 0) {
        oldMember.voiceChannel.delete();
      } else {
        // change name
        let matchMember = oldMember.voiceChannel.members.find(
          x => `🥀» ${x.displayName}` == oldMember.voiceChannel.name
        );
        if (matchMember == null) {
          oldMember.voiceChannel.setName(
            `🥀» ${oldMember.voiceChannel.members.random().displayName}`
          );
        }
      }
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // todo create channel
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("➕│9 Kişilik Oda")
  ) {
    newMember.guild
      .createChannel(`🥀» ${newMember.displayName}`, {
        type: "voice",
        parent: newMember.voiceChannel.parent
      })
      .then(cloneChannel => {
                      setTimeout(function(){ 
                      newMember.setVoiceChannel(cloneChannel);
}, 1000);   

        cloneChannel.setUserLimit(9);
      });
  }
  // ! leave
  if (oldMember.voiceChannel != undefined) {
    if (oldMember.voiceChannel.name.startsWith("🥀» ")) {
      if (oldMember.voiceChannel.members.size == 0) {
        oldMember.voiceChannel.delete();
      } else {
        // change name
        let matchMember = oldMember.voiceChannel.members.find(
          x => `🥀» ${x.displayName}` == oldMember.voiceChannel.name
        );
        if (matchMember == null) {
          oldMember.voiceChannel.setName(
            `🥀» ${oldMember.voiceChannel.members.random().displayName}`
          );
        }
      }
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  // todo create channel
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("➕│10 Kişilik Oda")
  ) {
    newMember.guild
      .createChannel(`🥀» ${newMember.displayName}`, {
        type: "voice",
        parent: newMember.voiceChannel.parent
      })
      .then(cloneChannel => {
            setTimeout(function(){ 
                      newMember.setVoiceChannel(cloneChannel);
}, 1000);     


        cloneChannel.setUserLimit(10);
      });
  }
  // ! leave
  if (oldMember.voiceChannel != undefined) {
    if (oldMember.voiceChannel.name.startsWith("🥀» ")) {
      if (oldMember.voiceChannel.members.size == 0) {
        oldMember.voiceChannel.delete();
      } else {
        // change name
        let matchMember = oldMember.voiceChannel.members.find(
          x => `🥀» ${x.displayName}` == oldMember.voiceChannel.name
        );
        if (matchMember == null) {
          oldMember.voiceChannel.setName(
            `🥀» ${oldMember.voiceChannel.members.random().displayName}`
          );
        }
      }
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("🔒│")
  ) {
    if (
      newMember.voiceChannel.members.size > newMember.voiceChannel.userLimit
    ) {
      newMember.removeRoles(newMember.roles);
      setTimeout(function() {
        newMember.addRole("711241863125794819");
      }, 600);
      client.users
        .get(newMember.id)
        .send(
          `<a:nlm:711324362627743815>  **'Kayıt Odasına'** fazla kişi olarak girdiğin için bütün **yetkilerin** alındı!`
        );
      newMember.setVoiceChannel("711241865281929343");
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("🌹»")
  ) {
    if (
      newMember.voiceChannel.members.size > newMember.voiceChannel.userLimit
    ) {
      newMember.removeRoles(newMember.roles);
      setTimeout(function() {
        newMember.addRole("711241863125794819");
      }, 600);
      client.users
        .get(newMember.id)
        .send(
          `<a:nlm:711324362627743815>  **'Özel Odaya'** fazla kişi olarak girdiğin için bütün **yetkilerin** alındı!`
        );
      newMember.setVoiceChannel("711241865281929343");
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  if (
    newMember.voiceChannel != null &&
    newMember.voiceChannel.name.startsWith("🥀»")
  ) {
    if (
      newMember.voiceChannel.members.size > newMember.voiceChannel.userLimit
    ) {
      newMember.removeRoles(newMember.roles);
      setTimeout(function() {
        newMember.addRole("711241863125794819");
      }, 600);
      client.users
        .get(newMember.id)
        .send(
          `<a:nlm:711324362627743815>  **'Özel Odaya'** fazla kişi olarak girdiğin için bütün **yetkilerin** alındı!`
        );
      newMember.setVoiceChannel("711241865281929343");
    }
  }
});

client.on("userUpdate", async (old, nev) => {
  if (old.username !== nev.username) {
    if (
      nev.username.includes("ʀ") &&
      !client.guilds
        .get("711241862781992961")
        .members.get(nev.id)
        .roles.has("711241863125794821")
    ) {
      client.channels
        .get("711241863876837442")
        .send(
          `${nev}, **(ʀ)** tagını aldığı için aramıza katıldı ve **Riorwor Bot** tarafından **Reputable** rolü verildi!`
        );
      client.guilds
        .get("711241862781992961")
        .members.get(nev.id)
        .addRole("711241863125794821");
    }
  }
});

client.on("guildMemberAdd", member => {
  if (Date.now() - member.user.createdAt < 1000 * 60 * 60 * 24 * 10) {
    member.addRole("711241863155417092");
    client.channels
      .get("711241863637762083")
      .send(
        `${member}, hesabını son **7 gün** içerisinde açtığı için <@&711241863155417092> rolü verildi!`
      );
    setTimeout(function() {
      member.removeRole("711241862781992964");
    }, 800);
  }
});

client.on("guildMemberAdd", member => {
  if (member.user.displayAvatarURL.endsWith("gif")) {
    const embed = new Discord.RichEmbed()
      .setImage(member.user.avatarURL)
      .setColor("RANDOM");
    client.channels.get("711241864170307592").send(embed);
  }
});
