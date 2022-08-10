// This file will be used to register and update the slash commands for our bot application.
// NOTE: You only need to run node deploy-commands.js once. You should only run it again if you add or edit existing commands.

const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require('dotenv');

dotenv.config();

const token = process.env.DISCORD_TOKEN; // API Token
const clientId = process.env.APP_ID; // Your application's client id
const guildId = process.env.GUILD_ID; // Your development server's id
const publicKey = process.env.PUBLIC_KEY;

// An array of commands to register.
const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
