const { REST, Routes } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check if the bot is online.')
        .toJSON()
];

const rest = new REST({ version: '10' })
    .setToken(process.env.DISCORD_TOKEN);

async function deploy() {
    try {
        console.log('🔄 Registering slash commands...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('✅ Slash commands registered!');
    } catch (error) {
        console.error(error);
    }
}

deploy();
