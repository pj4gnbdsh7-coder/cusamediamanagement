const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('exile')
        .setDescription('Test Media Department exile command'),

    async execute(interaction) {
        await interaction.reply('🚫 Exile command works!');
    }
};
