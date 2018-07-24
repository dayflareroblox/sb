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

  }


});

bot.login(process.env.BOT_TOKEN);
