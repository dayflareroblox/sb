

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});


//---------------------------------------------------------------\\//---------------------------------------------------------------\\

bot.on('ready',() => {
bot.user.setActivity("Nonsense Diamond", {
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
 
   if(cmd === `${prefix}yt`){
     let ytembed = new Discord.RichEmbed()
     
     .setDescription("Remember to subscribe and smash that bell!")
     .setColor("#c700ff")
     .setThumbnail("https://cdn.discordapp.com/avatars/485786509170180098/b1f03f619ff4eafe6edba616e46d74ea.png?size=256")
     .setTitle("https://www.youtube.com/channel/UCRvLsJ4SOATDr4Ti3D2_5tw")
     .setFooter("Official property of Nonsense Diamond.")
     
     message.reply(ytembed);
 }   
      
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\
  if(cmd === `${prefix}officialexploit`){
        let embed = new Discord.RichEmbed()
        
        .setDescription("https://nonsensediamond.website/ND/")
        .setColor("#c700ff")
        .setFooter("Copyrighted by Nonsense Diamond")
        .addField("Maker:", "<@482231087528148992>")
  
        message.reply(embed);      
  }        
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\      

if(cmd === `${prefix}shout`){
   
     let announcement = args.join(" ");
     let embed = new Discord.RichEmbed()
     .setDescription(announcement)
     .setTitle("Diamond Announcement")
     .setThumbnail("https://cdn.discordapp.com/avatars/485786509170180098/b1f03f619ff4eafe6edba616e46d74ea.png?size=256")
     .setColor("#c700ff")
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
  .setColor("#c700ff")
  .setDescription("The bot status has been changed, please dont abuse this feature.")
  message.channel.send(aembed);
}
   
//---------------------------------------------------------------\\//---------------------------------------------------------------\\   
   
if(cmd === `${prefix}dm`){

     let mention = args[0];
     const msg = args.slice("1").join(" ");
     
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry you cant DM people.");
     if(message.mentions.users.first()) return message.mentions.users.first().send(msg);
      message.channel.send("User has been DM'ed! Thanks.");
      message.delete().catch(O_o=>{});
    
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

   let reportembed = new Discord.RichEmbed()
   .setDescription("Reports")
   .setColor("##c700ff")
   .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
   .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
   .addField("Channel", message.channel)
   .addField("Report time", message.createdAt)
   .addField("Report Reason", reason);


   let reportschannel = message.guild.channels.find(`name`, "modlog");
   if(!reportschannel) return message.channel.send("Couldnt find the specified channel path. :unamused:");
    if(message.mentions.users.first()) return message.mentions.users.first().send(reportembed);   

   message.delete().catch(O_o=>{});
   reportschannel.send(reportembed);
  return;
}
  
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\  
   
  if(cmd === `${prefix}kick`){

  let kUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
  if(!kUser) return message.channel.send("User not found. :unamused:");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry you cant kick people.");
  if(kUser.hasPermission("KICK_MEMBERS")) return message.reply("Sorry that user cannot be kicked.");

  let kEmbed = new Discord.RichEmbed()
  .setDescription("/KICK/")
  .setColor("#62a4f5")
  .addField("Kicked User.", `${kUser} with the ID: ${kUser.id}`)
  .addField("Kicked by:", `<@${message.author.username}> with the ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Kick Reason", kReason);

   let kchannel = message.guild.channels.find(`name`, "modlog");
   if(!kchannel) return message.channel.send("Channnel path not found. :smile:")

  message.guild.member(kUser).kick(kReason);
  kchannel.send(kEmbed);    


  return;
}



 //---------------------------------------------------------------\\//---------------------------------------------------------------\\  
  
   if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
    if(!bUser) return message.channel.send("User not found. :unamused:");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry you cant ban people.");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.reply("Sorry that user cannot be banned.");
  
  
    let bEmbed = new Discord.RichEmbed()
    .setDescription("/BAN/")
    .setColor("#FF0033")
    .addField("Banned User.", `${bUser} with the ID: ${bUser.id}`)
    .addField("Banned by:", `<@${message.author.username}> with the ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Banned Reason", bReason);
  
     let bChannel = message.guild.channels.find(`name`, "modlog");
     if(!bChannel) return message.channel.send("Channnel path not found. :smile:")
  
    message.guild.member(bUser).ban(bReason);
    bChannel.send(bEmbed);    


    return;
  }
  
});

bot.login(process.env.BOT_TOKEN);
