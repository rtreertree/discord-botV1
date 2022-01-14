require('dotenv').config();

console.log(`Login with token ${process.env.BOT_TOKEN}`);

const {
    Client,
    Intents
} = require('discord.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const PREFIX = '!';

//function zone//


/////////////////


client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is logged in!`);
});

client.on('messageCreate', (message)=>{
    if (message.author.bot === true) return;
    if(message.content.startsWith(PREFIX) === false) return;
    const [cmdName, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);

    switch(cmdName) {
        case 'random':
            if(args.length === 0){
                message.reply((Math.floor(Math.random() * 100)).toString());
                console.log(Math.random() * 100);
            }else if(args.length === 1){
                message.reply((Math.floor(Math.random() * args[0])).toString());
            }
            break;
        case 'kick':
            if(args.length !== 1) return message.reply('Use !kick <Member>');
            const member = message.mentions.members.first();
            if (member.kickable === true){
                member.kick('You kick by someone');
            } else {
                message.reply('this bot it not enough permissions to kick this member');
            }
    }

});



client.login(process.env.BOT_TOKEN);