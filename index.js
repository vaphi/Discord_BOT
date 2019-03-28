//const Discord = require('discord.js');
const Discord = require('discord.js');
const weather = require('weather-js');
const bot = new Discord.Client();
const fs = require('fs');
const random = require("random-js");


bot.login('Token');

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
    var DiscordPing = bot.ping;
        message.reply(Math.round(DiscordPing) + ' ms');
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

///////////////////////////////////////////////////MEME COMMAND////////////////////////////////////////////////////////////////////
if (msg.startsWith(prefix + 'meme')){
    //array for pictures
    var memeArray = 
    [
        "meme/0.jpg", "meme/1.jpg", "meme/2.jpg", "meme/3.jpg", "meme/4.jpg",
        "meme/5.jpg", "meme/6.jpg", "meme/7.jpg", "meme/8.jpg", "meme/9.jpg",
        "meme/10.jpg", "meme/11.jpg", "meme/12.jpg", "meme/13.jpg", "meme/14.jpg",
        "meme/15.jpg", "meme/16.jpg", "meme/17.jpg", "meme/18.jpg", "meme/19.jpg",
        "meme/20.jpg", 

    ]

    //function for random number, use random number to display picture
    async function meme() {
        var memeIndex = Math.floor(Math.random() * memeArray.length );

        //console out picture 
        message.reply("",{
            files: [
                    memeArray[memeIndex]
                  ]  
             }, message.channel.send);
    }

    meme();

}
///////////////////////////////////////////////////INSULT COMMAND//////////////////////////////////////////////////////////////////

if (msg.startsWith(prefix + 'insult')){
    
    //array for insults
    var insultArray = [
        "You have an IQ of a monkey", "Even a sea monkey dress better than you", "The last time I saw something like you, I flushed it" ,
        "thou art a fool and a coward", "You, sir, are an oxygen thief!", "why dont you go play in traffic" , "Hey, you have something on your chin...no, the 3rd one down",
        "There is no vaccine against stupidity", "I do not engage In metal combat with the unarmed", "I'm jealous of all the people that have not met you!", 
        "You're as useful as an ashtray on a motorcycle", 
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

//////////////////////////////////////////////////Pun Command/////////////////////////////////////////////////////////////////////
if (msg.startsWith(prefix + 'dadjokes')){
    
    //array for insults
    var DadJokesArray = [
        "What time did the man go to the dentist? \n \n **Tooth hurt-y**", "What do you call a fake noodle? \n \n **An Impasta**", "What do you call chesse that isn't yours \n \n **Nacho Cheese**",
        "This graveyard looks overcrowded \n \n **People must be dying in there**", "What do you call a fat psychic \n \n **A four-chin teller**",
        "Why dont't crabs give to charity? \n \n **Because they're shellfish**", "Did you hear that Arnold Schwarzenegger will be doing a movie about classical music? \n \n **He'll be Bach**",
        "I bought shoes from a drug dealer once? \n \n **I don't know what he laced them with, but I was tripping all day**", "Why did the duck cross the road? \n \n **To prove that he wasnn't a chicken**",

    ]

    async function dadjokes() {

        message.delete(); //deletes command

        var DadJokesIndex = Math.floor(Math.random() * DadJokesArray.length ); //randomize jokes

        message.reply(DadJokesArray[DadJokesIndex])
        }
            dadjokes(); //call dadjokes function      
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////// Emoji Command/////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////  Table flip Command/////////////////////////////////////////////////////////
if (msg.startsWith(prefix + 'tableflip')){
    
    async function tableflip() {
        
        message.delete(); //deletes command
        
        message.reply('**╯°□°）╯︵ ┻━┻**');
    }

    tableflip();

}

//////////////////////////////////////////////////  Table Unflip Command/////////////////////////////////////////////////////////////////
if (msg.startsWith(prefix + 'unflip')){
    
    async function unflip() {
        
        message.delete(); //deletes command
        
        message.reply('**┬─┬ ノ( ゜-゜ノ)**');
    }

    unflip();

}

//////////////////////////////////////////////////  Table Unflip Command/////////////////////////////////////////////////////////////////
if (msg.startsWith(prefix + 'shrug')){
    
    async function shrug() {
        
        message.delete(); //deletes command
        
        message.reply('**¯\_(ツ)_/¯**');
    }

    shrug();

}


});

