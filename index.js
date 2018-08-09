
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("guildMemberAdd", function(member){
   member.guild.channels.find("name", "welcome").sendMessage(member.toString() + "Welcome to SkyLounge! :smile: Make sure to read <#&471615845190205441> to know how to access more channels! :smile:");
});

bot.on('message', msg => {
  if (msg.content === 'fuck') {
    msg.reply("`You have just said a banned word, Carry on and you will find yourself muted.`  <@&471612597863448576>");
  }
});

bot.on('ready',() => {
bot.user.setActivity("on SkyNet.org", {
      type: "STREAMING",
      url: "https://www.twitch.tv/monstercat"
    });
})


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}purge`){
  message.channel.bulkDelete(args[0]);
 return;
}  
   
if(cmd === `${prefix}info1`){
 let aembed = new Discord.RichEmbed()
  .setDescription("Hello, I saw your asking for info on me, well I am a moderation/utility bot that is designed to aid you in your servers, we dont need them fun commands that others have iits pure moderation. C:");
   message.channel.send(aembed)
   message.delete();
}
     
   
     if(cmd === `${prefix}getnsfw`){

     message.member.addRole(message.guild.roles.find("name", "nsfw granted"));
     message.channel.send("You have been granted NSFW access to. :angry:");
  }
   
  if(cmd === `${prefix}verify`){

     message.member.addRole(message.guild.roles.find("name", "Verified member"));
    message.channel.send("Your all ranked up! :smile:");

     message.member.addRole(message.guild.roles.find("name", "🍔Member🍔")); 
  }
  
 if(cmd === `${prefix}information`){
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    message.channel.send("Hello, if you want information on me to continue then say !info1");
  return;
}

   
  if(cmd === `${prefix}botinfo`){

    let botembed = new Discord.RichEmbed()
    .setDescription("Skybot was made by SkyMaker, skybot is a automated moderation bot that helps you in all of your servers, SkyMaker scripted it with JS.")
    .setTitle("SkyBot Information")
    .setColor("#62a4f5")
    return message.channel.send(botembed);
  }

  if(cmd === `${prefix}announce`){

     let announcement = args.join(" ");
     let aembed = new Discord.RichEmbed()
     
       .setDescription(announcement)
     .setTitle(message.author.username)
     .setFooter("This bot was made by ScriptedBuilderz.")
     .setColor("#62a4f5")
     .setThumbnail("https://cdn.discordapp.com/attachments/471654505830940672/471654608511434752/skylounge.png")
     message.channel.send(aembed);
     message.channel.send("@everyone")
     message.delete();
  }

if(cmd === `${prefix}status`){

   let announcement = args.join(" ");
  
 if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry you cant say things.");  
   bot.user.setActivity(announcement)
}
if(cmd === `${prefix}dm`){

     let mention = args[0];
     const msg = args.slice("1");
     
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry you cant DM people.");
     if(message.mentions.users.first()) return message.mentions.users.first().send(msg);
      message.channel.send("User has been DM'ed! Thanks.");
   message.delete();
    
  }


 if(cmd === `${prefix}say`){

      if(!message.member.hasPermission("ADMINISTRATOR")) return;
      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);
      message.delete();
}
  
if (cmd === `${prefix}report`){

   let rUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
   if(!rUser) return message.channel.send("Sorry couldnt find user :unamused:");
   let reason = args.join(" ").slice(22);

   let reportembed = new Discord.RichEmbed()
   .setDescription("Reports")
   .setColor("#62a4f5")
   .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
   .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
   .addField("Channel", message.channel)
   .addField("Report time", message.createdAt)
   .addField("Report Reason", reason);


   let reportschannel = message.guild.channels.find(`name`, "reports");
   if(!reportschannel) return message.channel.send("Couldnt find the specified channel path. :unamused:");

   message.delete().catch(O_o=>{});
   reportschannel.send(reportembed);
   reportschannel.send("<@&471612597863448576>");
  return;
}
  
  if(cmd === `${prefix}kick`){

  let kUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
  if(!kUser) return message.channel.send("User not found. :unamused:");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry you cant kick people.");
  if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry that user cannot be kicked.");


  let kEmbed = new Discord.RichEmbed()
  .setDescription("/KICK/")
  .setColor("#62a4f5")
  .addField("Kicked User.", `${kUser} with the ID: ${kUser.id}`)
  .addField("Kicked by:", `<@${message.author.username}> with the ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Kick Reason", kReason);

   let kchannel = message.guild.channels.find(`name`, "incidents");
   if(!kchannel) return message.channel.send("Channnel path not found. :smile:")

  message.guild.member(kUser).kick(kReason);
  kchannel.send(kEmbed);


  return;
}
  
  
   if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
    if(!bUser) return message.channel.send("User not found. :unamused:");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry you cant ban people.");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry that user cannot be banned.");
  
  
    let bEmbed = new Discord.RichEmbed()
    .setDescription("/BAN/")
    .setColor("#FF0033")
    .addField("Banned User.", `${bUser} with the ID: ${bUser.id}`)
    .addField("Banned by:", `<@${message.author.username}> with the ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Banned Reason", bReason);
  
     let bChannel = message.guild.channels.find(`name`, "incidents");
     if(!bChannel) return message.channel.send("Channnel path not found. :smile:")
  
    message.guild.member(bUser).ban(bReason);
    bChannel.send(bEmbed);


    return;
  }
  
});

bot.login(process.env.BOT_TOKEN);
