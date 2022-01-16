require('dotenv').config();

const TOKEN = process.env.BOT_TOKEN;

console.log(`Login with token ${TOKEN}`);

const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');



const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

const commands = [];

client.commands = new Collection();

for(const file of commandFiles){
    let command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

console.log('done');

client.once('ready', () => {
    console.log('Bot now ready');

    const CLIENT_ID = client.user.id;

    const rest = new REST({
        version: '9'
    }).setToken(TOKEN);

    (async () => {
        try{
            await rest.put(Routes.applicationCommands(CLIENT_ID),{
                body :commands
            });
                console.log('Registered commands all');
                
        } catch(error){
            if(error) console.error(error);
        }
    })();
});


client.on('interactionCreate', async (interaction) => {
    if(!(interaction.isCommand())) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch (error){
        if(error) console.error(error);

        await interaction.reply({
            content :"Error with this command.",
            ephemeral: true
        });
    }
});


client.login(TOKEN);