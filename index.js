// fs is Node's native file system module. Collection is a class that 
// extends JavaScript's native Map class, and includes more extensive, useful functionality.
const fs = require('node:fs');

// path is Node's native path utility module. It helps construct paths to access files and directories. 
// Instead of manually writing './currentDirectory/fileYouWant' everywhere, one can instead use path.join() and pass each path segment as an argument. 
// Note however, you should omit '/' or other path segment joiners as these may be different depending on the operating system running your code. 
// One of the advantages of the path module is that it automatically detects the operating system and uses the appropriate joiners.
const path = require('node:path');

const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// To dynamically retrieve command files. First you'll need to get the path to the directory that stores your command files. 
// The node core module 'path' and it's join() method will help to construct a path and store it in a constant so you can reference it later. 
// Following that, the fs.readdirSync() method will return an array of all the file names in the directory, e.g. ['ping.js', 'user.js', ... ]. 
// To ensure only command files get returned, use Array.filter() to leave out any non-JavaScript files from the array. With that array, 
// loop over it and dynamically set your commands to the client.commands Collection.

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

// listen for /command interaction
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Login to Discord with your client's token
client.login(token);
