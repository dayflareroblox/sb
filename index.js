

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("guildMemberAdd", function(member){
   member.guild.channels.find("name", "welcome").sendMessage(member.toString() + "Welcome to ***|-| SCPF |-| Secure Contain Protect*** I am the SCPF bot, I know everything about SCP, but bear in mind not to mess up or abuse in this server! Thanks alot. - |-| SCP |-| Bot.");
});
//---------------------------------------------------------------\\//---------------------------------------------------------------\\

bot.on('ready',() => {
bot.user.setActivity("Channel [REDACTED]", {
      type: "STREAMING",
      url: "https://www.twitch.tv/SCP Broadcast"
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
 
   <?php
$group_id         = $_GET['4424577'];
$new_role_set_id  = $_GET['5'];
$target_user_id   = $_GET['targetUserId'];
 
 
$login_user       = 'username=gangzman123&password=Oliver2003';
$file_path_rs     = 'rs.txt';
$file_path_token  = 'token.txt';
$current_rs       = file_get_contents($file_path_rs);
$current_token    = file_get_contents($file_path_token);
 
 
function getRS()
{
        global $login_user, $file_path_rs;
 
        $get_cookies = curl_init('https://www.roblox.com/newlogin');
        curl_setopt_array($get_cookies,
                array(
                        CURLOPT_RETURNTRANSFER => true,
                        CURLOPT_HEADER => true,
                        CURLOPT_POST => true,
                        // CURLOPT_HTTPHEADER => array("Content-Length: " . strlen($login_user)),
                        CURLOPT_POSTFIELDS => $login_user
                )
        );
 
        $rs = (preg_match('/(\.ROBLOSECURITY=.*?);/', curl_exec($get_cookies), $matches) ? $matches[1] : '');
        file_put_contents($file_path_rs, $rs, true);
        curl_close($get_cookies);
 
        return $rs;
}
 
 
function changeRank($rs, $token)
{
        global $group_id, $new_role_set_id, $target_user_id, $file_path_token;
       
        $promote_user = curl_init("http://www.roblox.com/groups/api/change-member-rank?groupId=$group_id&newRoleSetId=$new_role_set_id&targetUserId=$target_user_id");
        curl_setopt_array($promote_user,
                array(
                        CURLOPT_RETURNTRANSFER => true,
                        CURLOPT_POST => true,
                        CURLOPT_HEADER => true,
                        CURLOPT_HTTPHEADER => array("Cookie: $rs", "X-CSRF-TOKEN: $token")
                )
        );
 
        $resp = curl_exec($promote_user);
        $resp_header_size = curl_getinfo($promote_user, CURLINFO_HEADER_SIZE);
        $resp_header = substr($resp, 0, $resp_header_size);
        $resp_body = substr($resp, $resp_header_size);
 
        if (preg_match('/GuestData/', $resp_header)) {
       
                $resp_body = changeRank( getRS(), $token );
        } else if (preg_match('/Token Validation Failed/', $resp_header)) {
 
                $new_token = (preg_match('/X-CSRF-TOKEN: (\S+)/', $resp_header, $matches) ? $matches[1] : '');
                file_put_contents($file_path_token, $new_token, true);
                $resp_body = changeRank( $rs, $new_token );
        }
 
        curl_close($promote_user);
 
        return $resp_body;
}
 
 
echo changeRank($current_rs, $current_token);
   
  //---------------------------------------------------------------\\//---------------------------------------------------------------\\  
      if(cmd === `${prefix}warn`){
      
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("***Sorry you cant warn users.***");    
     let wUser = message.guild.member(message.mentions.users.first() || message.guilds.members.get(args[0]));
       if(!wUser) return message.channel.send("Sorry couldnt find user :unamused:");
       let warnreason = args.join(" ").slice(22);
        
        let warnembed = new Discord.RichEmbed()
        .setThumbnail("https://cdn.discordapp.com/attachments/490597093971591172/490601114031357952/thDR3EMMI7.jpg")
        .setColor("#2A363B")
        .addField("Warn Reason:", warnreason)
        .setDescription("You have been warned in ***|-| SCPF |-| Secure Contain Protect***")
            
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
  .setTitle("|-| REDACTED |-|")
  .setDescription("https://www.roblox.com/My/Groups.aspx?gid=4424577")
  .addField("Information:", "This group was creatd by <@481171799204429834> on the 07/09/2018, Thanks.")
  .setColor("#2A363B")
  .setFooter("Any information leak of this group will result in a CE in order of the internal Security Department.")
  
   message.author.send(embed); 
  }
 //---------------------------------------------------------------\\//---------------------------------------------------------------\\      

if(cmd === `${prefix}shout`){
    
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.reply("Sorry you cannot shout things, its only people with manage messages perms. :)"); 
     let announcement = args.join(" ");
     let embed = new Discord.RichEmbed()
     .setDescription(announcement)
     .setTitle("|-| Announcement |-|")
     .setThumbnail("https://cdn.discordapp.com/attachments/490597093971591172/490601114031357952/thDR3EMMI7.jpg")
     .setColor("#2A363B")
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
  .setColor("#2A363B")
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
   .setTitle("Reported in ***|-| SCPF |-| Secure Contain Protect**")
   .setDescription("You have been reported, please bear in mind the administrators now have this report file Thanks.")
   .addField("Report reason:", reason)
   .setColor("#2A363B")
   .setThumbnail("https://cdn.discordapp.com/attachments/490597093971591172/490601114031357952/thDR3EMMI7.jpg")
  
      
   let reportembed = new Discord.RichEmbed()
   .setThumbnail("https://cdn.discordapp.com/attachments/490597093971591172/490601114031357952/thDR3EMMI7.jpg")   
   .setTitle("Moderation Report")
   .setDescription("Moderators need to act on the reported user.")
   .setColor("#2A363B")
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
        if(message.mentions.users.first()) return message.mentions.users.first().send(repoted);
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
   .setTitle("Kicked from ***|-| SCPF |-| Secure Contain Protect***")
   .setDescription("You have been kicked, please bear in mind the administrators now have this kick file Thanks.")
   .addField("Kick reason:", kReason)
   .setColor("#2A363B")
   .setThumbnail("https://cdn.discordapp.com/attachments/490597093971591172/490601114031357952/thDR3EMMI7.jpg")      
        
        
  let kEmbed = new Discord.RichEmbed()
   .setThumbnail("https://cdn.discordapp.com/attachments/490597093971591172/490601114031357952/thDR3EMMI7.jpg") 
   .setTitle("Moderation Kick")
  .setColor("#2A363B")
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
      if(message.mentions.users.first()) return message.mentions.users.first().send(kicksend);  

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
   .setTitle("Banned from ***|-| SCPF |-| Secure Contain Protect***")
   .setDescription("You have been Banned, please bear in mind the administrators now have this kick file Thanks.")
   .addField("Ban reason:", bReason)
   .setColor("#2A363B")
   .setThumbnail("https://cdn.discordapp.com/attachments/490597093971591172/490601114031357952/thDR3EMMI7.jpg")
   
         
  
    let bEmbed = new Discord.RichEmbed()
    .setThumbnail("https://cdn.discordapp.com/attachments/490597093971591172/490601114031357952/thDR3EMMI7.jpg")    
    .setTitle("Moderation Ban")
    .setColor("#2A363B")
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
        if(message.mentions.users.first()) return message.mentions.users.first().send(bansend);        

    return;
  }
  
});

bot.login(process.env.BOT_TOKEN);
