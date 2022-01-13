require('dotenv').config();

console.log(`Login with token ${process.env.BOT_TOKEN}`);

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', ()=>{
    console.log(`${client.user.tag} was login`);
});



client.login(process.env.BOT_TOKEN);