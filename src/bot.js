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



client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is logged in!`);
});

client.on('messageCreate', (message)=>{
    if (message.author.bot === true) return;
    if(message.content.startsWith(PREFIX)){
        const [cmdName, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);

        message.reply(cmdName);
        console.log(args);
    }
});



client.login(process.env.BOT_TOKEN);