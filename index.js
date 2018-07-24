const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async message => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("on hax.com");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}botinfo`){

    let botembed = new Discord.RichEmbed()
    .setDescription("tut")
    .setTitle("Test")
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
     .setThumbnail("https://cdn.discordapp.com/attachments/471041267673989130/471055062701965333/lol.jpg")
     message.channel.send(aembed);
  }

if(cmd === `${prefix}status`){

   let announcement = args.join(" ");
   bot.user.setActivity(announcement)
}
if(cmd === `${prefix}dm`){

     let mention = (args[0]);
     let msg = (args[1]);
     
     if(message.mentions.users.first()) return message.mentions.users.first().send(msg);
     message.delete().catch();
  }


 if(cmd === `${prefix}say`){

      if(!message.member.hasPermission("ADMINISTRATOR")) return;
      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);
      message.delete();
}
  
if (cmd === `${prefix}report`){

   let rUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0])));
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


   let reportschannel = message.guild.chanels.find(`name`, "reports");
   if(!reportschannel) return message.channel.send("Couldnt find the specified channel path. :unamused:");

   message.delete().catch(O_o=>{});
   reportschannel.send(reportembed);

  return;
}
  
});

bot.login(process.env.BOT_TOKEN);
