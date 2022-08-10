// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
// Set up environment variables for private tokens and keys
const dotenv = require('dotenv');

dotenv.config();

const token = process.env.DISCORD_TOKEN; // API Token
const clientId = process.env.APP_ID; // Your application's client id
const guildId = process.env.GUILD_ID; // Your development server's id
const publicKey = process.env.PUBLIC_KEY;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

// listen for /command interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') { // interacting with guild aka server
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'user') { // interacting with user
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
});

// Login to Discord with your client's token
client.login(token);
