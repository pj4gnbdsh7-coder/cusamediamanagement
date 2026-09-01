const {
    Client,
    GatewayIntentBits
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    console.log(`📡 Servers: ${client.guilds.cache.size}`);
});

client.on('error', console.error);

client.login(process.env.MTU0NDE5MzQxMDI3MTgwNTQ0MA.Gro79B.uIvvj_bF-ASbKHO7j7DEt8dwa0UqIw8RzfSYO8);
