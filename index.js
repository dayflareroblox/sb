

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});


//---------------------------------------------------------------\\//---------------------------------------------------------------\\

bot.on('ready',() => {
bot.user.setActivity("Ragna Music®", {
      type: "STREAMING",
      url: "https://www.twitch.tv/monstercat"
    });
})

//---------------------------------------------------------------\\//---------------------------------------------------------------\\

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
 
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\
      if(cmd === `${prefix}warn`){
      
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("***Sorry you cant warn users.***");    
     let wUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
       if(!wUser) return message.channel.send("Sorry couldnt find user :unamused:");
       let warnreason = args.join(" ").slice(22);
        
        let warnembed = new Discord.RichEmbed()
        .setThumbnail("https://cdn.discordapp.com/attachments/487644878570913812/487648325357666304/dreamarena_finale_by_artifactdesign-d71ait9.png")
        .setColor("#ff0043")
        .addField("Warn Reason:", warnreason)
        .setDescription("You have been warned in ***Ragna Night Club®***")
            
       message.reply("***User has been warned.***");   
            
       if(message.mentions.users.first()) return message.mentions.users.first().send(warnembed);       
      }            
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\       
 
   if(cmd === `${prefix}help`){
     message.reply("wip");
 }   
      
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\
  if(cmd === `${prefix}Group`){
  let embed = new Discord.RichEmbed()
  .setTitle("Ragna Bot®")
  .setDescription("https://www.roblox.com/My/Groups.aspx?gid=4407483")
  .addField("Information:", "This group was creatd by <@481171799204429834> on the 07/09/2018, Thanks.")
  .setColor("#ff0043")
  .setFooter("Official property of Ragna®")
  }
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\      

if(cmd === `${prefix}shout`){
   
     let announcement = args.join(" ");
     let embed = new Discord.RichEmbed()
     .setDescription(announcement)
     .setTitle("Ragna Announcement®")
     .setThumbnail("https://cdn.discordapp.com/attachments/487644878570913812/487648325357666304/dreamarena_finale_by_artifactdesign-d71ait9.png")
     .setColor("#ff0043")
      message.delete();
     message.channel.send(embed)

}   

 //---------------------------------------------------------------\\//---------------------------------------------------------------\\   

 if(cmd === `${prefix}status`){

   let announcement = args.join(" ");
 
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry you cant set status.");  
  bot.user.setActivity(announcement)
   
  let aembed = new Discord.RichEmbed()
  .setTitle("Bot Status")
  .setColor("#ff0043")
  .setDescription("The bot status has been changed, please dont abuse this feature.")
  message.channel.send(aembed);
}
   
//---------------------------------------------------------------\\//---------------------------------------------------------------\\   
   
if(cmd === `${prefix}dm`){

     let mention = args[0];
     const msg = args.slice("1").join(" ");
     
     message.channel.send("User has been DM'ed! Thanks.");
      message.delete().catch(O_o=>{});
      
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry you cant DM people.");
     if(message.mentions.users.first()) return message.mentions.users.first().send(msg);
  }

//---------------------------------------------------------------\\//---------------------------------------------------------------\\
   
 if(cmd === `${prefix}say`){

      if(!message.member.hasPermission("ADMINISTRATOR")) return;
      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);
      message.delete().catch(O_o=>{});
}
  
//---------------------------------------------------------------\\//---------------------------------------------------------------\\  
   
if (cmd === `${prefix}report`){

   let rUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
   if(!rUser) return message.channel.send("Sorry couldnt find user :unamused:");
   let reason = args.join(" ").slice(22);

   let repoted = new Discord.RichEmbed()
   .setTitle("Reported in ***Ragna Discord server***")
   .setDescription("You have been reported, please bear in mind the administrators now have this report file Thanks.")
   .addField("Report reason:", reason)
   .setColor("#ff0043")
   .setThumbnail("https://cdn.discordapp.com/attachments/487644878570913812/487648325357666304/dreamarena_finale_by_artifactdesign-d71ait9.png")
   if(message.mentions.users.first()) return message.mentions.users.first().send(repoted);  
      
   let reportembed = new Discord.RichEmbed()
   .setThumbnail("https://cdn.discordapp.com/attachments/487644878570913812/487648325357666304/dreamarena_finale_by_artifactdesign-d71ait9.png")   
   .setDescription("Reports")
   .setColor("#ff0043")
   .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
   .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
   .addField("Channel", message.channel)
   .addField("Report time", message.createdAt)
   .addField("Report Reason", reason);


   let reportschannel = message.guild.channels.find(`name`, "modlogs");
   if(!reportschannel) return message.channel.send("Couldnt find the specified channel path. :unamused:");
   

   message.delete().catch(O_o=>{});
   reportschannel.send(reportembed);
      message.reply("***User had been reported, if you are fake reporting you will be blacklisted from this server immidiatley.***")   
  return;
}
  
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\  
   
  if(cmd === `${prefix}kick`){

  let kUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
  if(!kUser) return message.channel.send("User not found. :unamused:");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry you cant kick people.");
  if(kUser.hasPermission("KICK_MEMBERS")) return message.reply("Sorry that user cannot be kicked.");

   let kicksend = new Discord.RichEmbed()
   .setTitle("Kicked from ***Ragna Discord server***")
   .setDescription("You have been kicked, please bear in mind the administrators now have this kick file Thanks.")
   .addField("Kick reason:", kReason)
   .setColor("#ff0043")
   .setThumbnailhttps://cdn.discordapp.com/attachments/487644878570913812/487648325357666304/dreamarena_finale_by_artifactdesign-d71ait9.png")
   if(message.mentions.users.first()) return message.mentions.users.first().send(kicksend);        
        
        
  let kEmbed = new Discord.RichEmbed()
   .setThumbnail("https://cdn.discordapp.com/attachments/487644878570913812/487648325357666304/dreamarena_finale_by_artifactdesign-d71ait9.png") 
  .setDescription("/KICK/")
  .setColor("#62a4f5")
  .addField("Kicked User.", `${kUser} with the ID: ${kUser.id}`)
  .addField("Kicked by:", `<@${message.author.username}> with the ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Kick Reason", kReason);

   let kchannel = message.guild.channels.find(`name`, "modlogs");
   if(!kchannel) return message.channel.send("Channnel path not found. :smile:")

  message.guild.member(kUser).kick(kReason);
  kchannel.send(kEmbed);    
  message.reply("***User had been Kicked.***"); 

  return;
}



 //---------------------------------------------------------------\\//---------------------------------------------------------------\\  
  
   if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
    if(!bUser) return message.channel.send("User not found. :unamused:");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry you cant ban people.");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.reply("Sorry that user cannot be banned.");
  
   let bansend = new Discord.RichEmbed()
   .setTitle("Banned from ***Ragna Discord server***")
   .setDescription("You have been Banned, please bear in mind the administrators now have this kick file Thanks.")
   .addField("Ban reason:", bReason)
   .setColor("#ff0043")
   .setThumbnailhttps://cdn.discordapp.com/attachments/487644878570913812/487648325357666304/dreamarena_finale_by_artifactdesign-d71ait9.png")
   if(message.mentions.users.first()) return message.mentions.users.first().send(bansend);       
         
  
    let bEmbed = new Discord.RichEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/485820357975080981/485910920728412170/images.jpg")    
    .setDescription("/BAN/")
    .setColor("#FF0033")
    .addField("Banned User.", `${bUser} with the ID: ${bUser.id}`)
    .addField("Banned by:", `<@${message.author.username}> with the ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Banned Reason", bReason);

  
     let bChannel = message.guild.channels.find(`name`, "modlogs");
     if(!bChannel) return message.channel.send("Channnel path not found. :smile:")
  
    message.guild.member(bUser).ban(bReason);
    bChannel.send(bEmbed);    
  message.reply("***User had been Banned.***");

    return;
  }
  
});

bot.login(process.env.BOT_TOKEN);
