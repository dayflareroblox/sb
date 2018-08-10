

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("guildMemberAdd", function(member){
   member.guild.channels.find("name", "welcome").sendMessage(member.toString() + "Welcome to SkyLounge! :smile: Make sure to read <#471615845190205441> to know how to access more channels! :smile:");
});



bot.on('ready',() => {
bot.user.setActivity("SmartMod.V.1.0.0", {
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
       
 if(cmd === `${prefix}invite`){
  message.channel.send("https://discordapp.com/oauth2/authorize?client_id=477392293238800395&permissions=2080898295&scope=bot");
  message.channel.send("***THIS INVITE LINK WILL ONLY BE AVAILABLE FOR A SHORT PERIOD OF TIME, SPAMMING USE OF IT WIL RESULT IN YOU BEING BLACKISTED FROM USE OF THIS BOT***");  
  
 }   
 
   
if(cmd === `${prefix}addrole`){

    let mention = message.mentions.members.first() || message.guild.members.get(args[0]);
    let role = message.mentions.roles.first() || message.guild.roles.get(args[1]);

     
       if(!mention) return message.channel.send("Cant find user or not specifed.");
       if(!role) return message.channel.send("Could not find that role.");

       if(mention.roles.has(role.id)) return message.channel.send("That user already has that role.");

       mention.addRole(role);

       message.channel.send("Added " + role.name  + " to " + mention.name + ".").then(msg => msg.delete(10000));
  }
   
   
   
  if(cmd === `${prefix}verify`){

     message.member.addRole(message.guild.roles.find("name", "Verified member"));
    message.channel.send("Your all ranked up! :smile:");

     message.member.addRole(message.guild.roles.find("name", "🍔Member🍔")); 
  }
  
 if(cmd === `${prefix}information`){
    let aembed = new Discord.RichEmbed()
    .setTitle("Information About SM.")
    .setDescription("Smart Moderation was made by Scripted, It should allways be used securely in a verified server, this bot will automatically warn users for there corruptive behaviour if it senses it, This bot will also moderate your server and keep it calm without troller's.")
    .addField("Credits:", "ScriptedBuilderz, Pliexe, Ragerous.")
    .addField("Version:", "V.1.0.0")
    .addField("Origin:", "United Kingdon")
    .setColor("#bcfbf2");          
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
     message.channel.send("<@&477180353786937355>")
     message.delete();
  }

if(cmd === `${prefix}status`){

   let announcement = args.join(" ");
  
 if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry you cant say things.");  
   bot.user.setActivity(announcement)
}
if(cmd === `${prefix}dm`){

     let mention = args[0];
     const msg = args.slice("1").join(" ");
     
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
