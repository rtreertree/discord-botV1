const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('resend your input'),
        // .addStringOption((option) => 
        //     option
        //         .setName('message')
        //         .setDescription('message')
        //         .setRequired('true')
        // ),
    async execute(interaction){
        interaction.reply({
            content: 'Ello', 
            ephemeral: false
        });
    }
}