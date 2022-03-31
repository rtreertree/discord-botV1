const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ui')
        .setDescription('show ui')
        .addStringOption((option) => 
             option
                 .setName('message')
                 .setDescription('message')
                 .setRequired(true)
        ),
    async execute(interaction){
        const { MessageActionRow, MessageButton } = require('discord.js');

        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);

		await interaction.reply({ content: 'Pong!', components: [row] });
    }
}