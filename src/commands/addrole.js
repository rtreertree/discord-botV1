const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Add simple role to member')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Select a role').setRequired(true)),
    async execute(interaction){
        const member = interaction.options.getMember('target');
        const role = interaction.options.getRole('role');

        if(!member.manageable|| !role.editable) return interaction.reply({
            content: 'Not enough permission to add this role',
            ephemeral: true
        });

        member.roles.add(role);
        interaction.reply({
            content: `Done to add role to ${member}`
        });
    }
}   