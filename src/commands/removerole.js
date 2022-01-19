const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removerole')
        .setDescription('Remove role from member')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Select a role').setRequired(true)),
    async execute(interaction){
        const member = interaction.options.getMember('target');
        const role = interaction.options.getRole('role');

        if(!member.manageable || !role.editable || !interaction.member.roles.cache.some(role)) return interaction.reply({
            content: 'Can not remove role from this member',
            ephemeral: true
        });

        member.roles.add(role);
        interaction.reply({
            content: `Done to add role to ${member}`
        });
    }
}   