const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('permission')
        .setDescription('Get what what member can do')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
    async execute(interaction){
        let text = '';
        const member = interaction.options.getMember('target');

        const permissions = interaction.member.permissions.toArray();
        for(let i = 0; i < permissions.length;i++){
            //console.log(`${permissions[i]} : ${member.permissions.has(permissions[i])}`);
            text = text + `${permissions[i]} : ${member.permissions.has(permissions[i])}\n`;
        }
        text = '```' +  text + '```'

        interaction.reply(text);

    }
}   