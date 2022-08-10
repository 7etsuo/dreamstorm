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

// Login to Discord with your client's token
client.login(token);
