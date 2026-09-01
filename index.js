const {
    Client,
    GatewayIntentBits,
    Collection
} = require('discord.js');

const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
}

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log(`📡 Servers: ${client.guilds.cache.size}`);
    console.log(`⚡ Commands loaded: ${client.commands.size}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: '❌ Something went wrong while running this command.',
                ephemeral: true
            });
        } else {
            await interaction.reply({
                content: '❌ Something went wrong while running this command.',
                ephemeral: true
            });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
