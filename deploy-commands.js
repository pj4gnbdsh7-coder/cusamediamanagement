const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];

const commandsPath = path.join(__dirname, 'commands');

for (const file of fs.readdirSync(commandsPath)) {
    if (!file.endsWith('.js')) continue;

    const command = require(path.join(commandsPath, file));

    if (command.data && command.execute) {
        commands.push(command.data.toJSON());
    }
}

console.log(`📦 Found ${commands.length} commands:`);
console.log(commands.map(command => `/${command.name}`).join(', '));

const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_TOKEN
);

async function deploy() {
    try {
        console.log(`🤖 Application ID: ${process.env.CLIENT_ID}`);
        console.log(`🏠 Server ID: ${process.env.GUILD_ID}`);

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {
                body: commands
            }
        );

        console.log('✅ Commands successfully registered!');
    } catch (error) {
        console.error('❌ Failed to register commands:');
        console.error(error);
    }
}

deploy();
