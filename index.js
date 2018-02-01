//const Discord = require('discord.js');
const Discord = require('discord.js');
const weather = require('weather-js');
const bot = new Discord.Client();
const fs = require('fs');
const random = require("random-js");


bot.login('Mzg2MzQ5ODM3OTExNTg4ODY0.DQOn9g.3CZ2cpi4-hoO3Kdv8Glafy5_Zao');

// Calling Files
const Commands = JSON.parse(fs.readFileSync('Util/Commands.json', 'utf8'));

// Bot settings
const prefix = '?';

//Listener event
bot.on('ready', () => {
    console.log('Bot started.')
})

// Bot listener
bot.on('message', (message) => {

    let msg = message.content.toLowerCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

   if(msg === prefix + 'ping') {
        message.reply('pong');
   }

///////////////////////////////////////////////////PURGE COMMAND//////////////////////////////////////////////////////////////////
   
if(msg.startsWith(prefix + 'purge')) {

        async function purge() {
            message.delete();
            
            if (!message.member.roles.find("name", "purger")) {
            message.reply('You need the \'purger\' role to use this command.');
            return;
            }

            if (isNaN(args[0])){
                message.reply('Please use a number as your arguments. \n Usage ' + prefix + 'purge <amount>');
                return;
            }
            const fetched = await message.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + 'message found, deleting...');

            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: $(error)`));
        }

        purge();
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////WEATHER COMMAND//////////////////////////////////////////////////////////////////

if (msg.startsWith(prefix + 'weather')){

    weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
        if (err) message.channel.send(err);

        if(result.length === 0) { //invalid location
            message.reply(`***Please enter a valid location.**`)
            return;
        }
        //message.channel.send(JSON.stringify(result[0].current, null, 2));

        var current = result[0].current;
        var location = result[0].location;

        const embed = new Discord.RichEmbed()

            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather for ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(0x00AE86)
            .addField('Timezone',`UTC${location.timezone}`, true)
            .addField('Degree Type', location.degreetype, true)
            .addField('Temperature', `${current.temperature} Degrees`, true)
            //.addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Winds',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)

            message.channel.send({embed});
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////Help COMMAND//////////////////////////////////////////////////////////////////

if (msg.startsWith(prefix + 'help')){

    if (msg === `${prefix}help`) {

        const embed = new Discord.RichEmbed()
        .setColor(0x1D82B6)

        let CommandsFound = 0;

        for (var cmd in Commands) {

            if (Commands[cmd].group.toLowerCase() === 'user'){
                CommandsFound++
                embed.addField(`${Commands[cmd].name}`, `**Description:** ${Commands[cmd].desc}\n**Usage:** ${prefix + Commands[cmd].usage}`);
            }
        }

        embed.setFooter(`Currently showing user Commands, to view another group do ${prefix}help [group / command]`)
        embed.setDescription(`**${CommandsFound} Commands found** - <> means required, [] means optional`)

        message.author.send({embed})

        message.channel.send({embed: {
            color: 0x1D82B6,
            description: `**Check your DMs ${message.author}!**`
        }})

    } else if (args.join(" ").toLowerCase === 'groups') {

        let groups = '';

        for (var cmd in Commands) {
            if (!groups.includes(Commands[cmd].group)) {
                groups += `${Commands[cmd].group}\n`
        }
    }

    message.channel.send({embed: {
        description:`**${groups}**`,
        titles:"Groups",
        color: 0x1D82B6
    }})

    return;

 } else {

        let groupFound = '';

          for (var cmd in Commands) {
            
            if (args.join(" ").trim().toLowerCase() === Commands[cmd].group.toLowerCase()){
                groupFound = Commands[cmd].group.toLowerCase();
                break;
            }
         }

    if (groupFound != '') {

            const embed = new Discord.RichEmbed()
            .setColor(0x1D82B6)
    
            let commandsFound = 0;

            for (var cmd in Commands) {
                
               if (Commands[cmd].group.toLowerCase() === groupFound) {

               commandsFound++

               embed.addField(`${Commands[cmd].name}`, `**Description:** ${Commands[cmd].desc}\n**Usage:** ${prefix + Commands[cmd].usage}`);
               }
            }
         
         embed.setFooter(`Currently showing ${groupFound} Commands to view another group do ${prefix}help [group / command]`)
         embed.setDescription(`**${commandsFound} Commands found** - <> means required, [] means optional`)
 
         message.author.send({embed})
 
         message.channel.send({embed: {
             color: 0x1D82B6,
             description: `**Check your DMs ${message.author}!**`
         }})

         return;
    }

    let commandFound = '';
    let commandDesc = '';
    let commandUsage = '';
    let commandGroup = '';

    for (var cmd in Commands) {

        if (args.join(" ").trim().toLowerCase() === Commands[cmd].name.toLowerCase()){
            commandFound = Commands[cmd].name;
            commandDesc = Commands[cmd].desc;
            commandUsage = Commands[cmd].usage;
            commandGroup = Commands[cmd].group;
            break;
        }
    }

    if (commandFound === '') {
        message.channel.send({embed: {
            description: `**No Group or command found titled \`${args.join(" ")}\`**`
        }})
    }

    message.channel.send({embed: {
        title:`<> means required, [] means optional`,
        color: 0x1D82B6,
        fields: [{
            name:commandFound,
            value:`**Description:** ${commandDesc}\n**Usage:** ${commandUsage}\n**Group:** ${commandGroup}`
        }]
    }})

    return;
    }   
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////WAIFU COMMAND//////////////////////////////////////////////////////////////////
if (msg.startsWith(prefix + 'waifu')){
    //array for pictures
    var waifuArray = 
    [
        "waifu/0.jpg", "waifu/1.jpg", "waifu/2.jpg", "waifu/3.jpg", "waifu/4.jpg",
        "waifu/5.jpg", "waifu/6.jpg", "waifu/7.gif", "waifu/8.jpg", "waifu/9.jpg",
        "waifu/10.jpg", "waifu/11.jpg", "waifu/12.jpg", "waifu/13.gif", "waifu/14.jpg",
        "waifu/15.jpg", "waifu/16.jpg", "waifu/17.jpg", "waifu/18.gif", "waifu/19.jpg",
        "waifu/20.jpg", 

    ]
    //array for names
    var nameArray = [
        "Kurumi Tokisaki", "Anastasia", "Hibiki Kai", "Hamakaze Yukata" , "Kurisu Makise" ,
        "Astolfo", "Ene Enomoto" , "Elizabeth-Chan", "Android 18", "Shibuya Rin", "Yuuki Asuna", 
        "Ruka Urushibara", "Error 404 : Name not found", "Aqua", "Megumi Kato", "Utaha Kasumigaoka",
        "Eriri Sawamura", "Kobayashi", "Arch Wizard Megumi", "Hitagi Senjougahara", "Danmachi Hestia",

    ]
    //function for random number, use random number to display picture and name
    async function waifu() {
        var waifuIndex = Math.floor(Math.random() * waifuArray.length );

        //console out picture and name
        message.reply('your waifu is... '+`**`+nameArray[waifuIndex]+`**`, {
            files: [
                    waifuArray[waifuIndex]
                  ]  
             }, message.channel.send);
    }

    waifu();

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////INSULT COMMAND//////////////////////////////////////////////////////////////////

if (msg.startsWith(prefix + 'insult')){
    
    //array for insults
    var insultArray = [
        "Your waifu is trash", "You must have been born on a highway because that's where most accidents happen", "Life is full of disappointments. Take you for example!", 
        "thou art a flesh-monger, a fool and a coward" , "Go eat a bag of dicks", "You sir is a pussy bitch", "Hold on there, you fucktard anal flap... Did you just go full throttle twat waffle?!?" , 
        "2D girls aren't real", "You're adopted", "Santa thinks you're gay", 
    ]

    async function insult() {

        message.delete(); //deletes command

        var insultIndex = Math.floor(Math.random() * insultArray.length ); //randomize insult
        
          if (message.mentions.members.first()){ //if someone mentions a user
            message.channel.send(`${message.mentions.members.first()}, ` + `**` + insultArray[insultIndex] +`**`);
           }

         else{// mention does not exist
            message.reply('Please mention an existing user. \n Usage ' + prefix + 'insult <@User>'); 
            return;
         }
        }
            insult(); //call insult function      
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});

