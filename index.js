// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
// Set up environment variables for private tokens and keys
const dotenv = require('dotenv');

dotenv.config();

const token = process.env.DISCORD_TOKEN; // Todo: get a new token i've been leaked
const app_id = process.env.APP_ID;
const guild_id = process.env.GUILD_ID;
const public_key = process.env.PUBLIC_KEY;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);
