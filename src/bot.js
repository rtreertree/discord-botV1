require('dotenv').config();

const TOKEN = process.env.BOT_EPIC;

console.log(`Login with token ${TOKEN}`);

const USE_ABLE = ['765105219729883158', '1234567890'];

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

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (!(message.content.startsWith('!'))) return;

    switch(message.content){
        case '!add':
            const member = message.guild.members.cache.find(mem => mem.user.username === 'jaja blink')
            console.log(member);
            break;
        case '!per':
            const role = message.guild.roles.cache.find(role => role.name === 'addTest');
            const perms = message.member.permissions.has('KICK_MEMBERS');
            break;
        case '!test':
            const member1 = message.guild.members.cache.find(mem => mem.user.username === 'jaja blink');
            const member2 = message.guild.members.cache.find(mem => mem.user.username === 'A penguin');
            console.log(member1);
            console.log(message.member.permissions.has('KICK_MEMBERS'));

            //const permissions1 = member1.permissions.toArray();
            const permissions2 = message.member.permissions.toArray();
            
            //console.log(permissions1.length);
            //console.log(permissions2.length);

            break;

    }

    //let role = message.guild.roles.cache.find(role => role.name === 'addTest')
    //message.member.roles.add(role)

});

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


    if (interaction.isButton()){
        interaction.reply('CLICK');
    };

    if(!(interaction.isCommand())) return;

    const command = client.commands.get(interaction.commandName);
 
    if(!command) return;

    let  user = interaction.member.id;

    if(USE_ABLE.indexOf(user) === -1) {
        interaction.reply({
            content: 'FF DO NOT USE THIS COMMAND',
            ephemeral: true
        });
        return;
    }

    console.log(`[${interaction.guild.name}(${interaction.member.displayName})]`);

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