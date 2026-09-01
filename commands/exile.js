const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exile')
        .setDescription('Exile a member from the Media Department.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The member being exiled.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('roblox_username')
                .setDescription('The member\'s Roblox username.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('roblox_id')
                .setDescription('The member\'s Roblox ID.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Reason for the exile.')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

    async execute(interaction) {
        const target = interaction.options.getMember('user');
        const robloxUsername =
            interaction.options.getString('roblox_username');

        const robloxId =
            interaction.options.getString('roblox_id');

        const reason =
            interaction.options.getString('reason');

        if (!target) {
            return interaction.reply({
                content: '❌ I could not find that member.',
                ephemeral: true
            });
        }

        if (target.id === interaction.user.id) {
            return interaction.reply({
                content: '❌ You cannot exile yourself.',
                ephemeral: true
            });
        }

        const exileEmbed = new EmbedBuilder()
            .setTitle('🚫 Media Department Exile')
            .setDescription(
                'You have been **exiled from the Media Department**.'
            )
            .addFields(
                {
                    name: 'Discord User',
                    value: `${target.user.tag}`,
                    inline: true
                },
                {
                    name: 'Discord ID',
                    value: target.id,
                    inline: true
                },
                {
                    name: 'Roblox User',
                    value: robloxUsername,
                    inline: true
                },
                {
                    name: 'Roblox ID',
                    value: robloxId,
                    inline: true
                },
                {
                    name: 'Reason For Exile',
                    value: reason,
                    inline: false
                },
                {
                    name: 'Exiled By',
                    value: `${interaction.user.tag}`,
                    inline: false
                }
            )
            .setTimestamp();

        try {
            await target.send({
                embeds: [exileEmbed]
            });
        } catch {
            console.log(`Could not DM ${target.user.tag}`);
        }

        await interaction.reply({
            content: `✅ ${target.user.tag} has been exiled from the Media Department.`,
            ephemeral: true
        });
    }
};
