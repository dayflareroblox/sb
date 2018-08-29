

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("guildMemberAdd", function(member){
   member.guild.channels.find("name", "welcome").sendMessage(member.toString() + "Welcome to SkyLounge! :smile: Make sure to read <#471615845190205441> to know how to access more channels! :smile:");
});

//---------------------------------------------------------------\\//---------------------------------------------------------------\\

bot.on('ready',() => {
bot.user.setActivity("CreamShake-V2", {
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
   
if(cmd === `${prefix}addrole`){

      let modRole = message.guild.roles.find("name", "ModerationStaff");
      if(message.member.roles.has(modRole.id)) {
      
      
   
    let mention = message.mentions.members.first() || message.guild.members.get(args[0]);
    let role = message.mentions.roles.first() || message.guild.roles.get(args[1]);
      
       if(!mention) return message.channel.send("Cant find user or not specifed.");
       if(!role) return message.channel.send("Could not find that role.");

       if(mention.roles.has(role.id)) return message.channel.send("That user already has that role.");

       mention.addRole(role);

       message.channel.send("Added " + role.name  + " to " + mention.name + ".").then(msg => msg.delete(10000));
  }
   else {
      message.reply("Incorrect permissions.");
   }
}
      
      
   
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\    
   
 if(cmd === `${prefix}information`){
    let aembed = new Discord.RichEmbed()
    .setTitle("Information About CS.")
    .setDescription("CS was originally Created by xXKillermanXx but was retaken by ScriptedBuilderz at a later date. CS was made to serve customer's happiness and quality food and drink's. CS will serve you quality, with great taste and happiness.")
    .addField("Credits:", "ScriptedBuilderz")
    .addField("Version:", "V.2.0.0")
    .addField("Origin:", "United Kingdon")
    .setColor("#bcfbf2"); 
    
    message.channel.send(aembed);
}

//---------------------------------------------------------------\\//---------------------------------------------------------------\\

  if(cmd === `${prefix}announce`){

   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry you cant announce things.");   
     let announcement = args.join(" ");
     let aembed = new Discord.RichEmbed()     
     
     .setDescription(announcement)
     .setTitle(message.author.username)
     .setFooter("Copyright.")
     .setColor("#62a4f5")
     message.channel.send(aembed);
     message.delete();
     message.channel.send("<@484445778887180298>");
  }

 //---------------------------------------------------------------\\//---------------------------------------------------------------\\
   
if(cmd === `${prefix}status`){

   let announcement = args.join(" ");
 
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry you cant set status.");  
  bot.user.setActivity(announcement)
   
  let aembed = new Discord.RichEmbed()
  .setTitle("Bot Status")
  .setDescription("The Bot status has been changed, bear in mind this command effects ``EVERY`` Server the bot is in.")
  message.channel.send(aembed);
}
   
//---------------------------------------------------------------\\//---------------------------------------------------------------\\   
   
if(cmd === `${prefix}dm`){

     let mention = args[0];
     const msg = args.slice("1").join(" ");
     
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry you cant DM people.");
     if(message.mentions.users.first()) return message.mentions.users.first().send(msg);
      message.channel.send("User has been DM'ed! Thanks.");
   message.delete();
    
  }

//---------------------------------------------------------------\\//---------------------------------------------------------------\\
   
 if(cmd === `${prefix}say`){

      if(!message.member.hasPermission("ADMINISTRATOR")) return;
      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);
      message.delete();
}
  
//---------------------------------------------------------------\\//---------------------------------------------------------------\\  
   
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


   let reportschannel = message.guild.channels.find(`name`, "modlog");
   if(!reportschannel) return message.channel.send("Couldnt find the specified channel path. :unamused:");

   message.delete().catch(O_o=>{});
   reportschannel.send(reportembed);
   reportschannel.send("<@ModerationStaff>");
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
