const { SlashCommandBuilder } = require('discord.js');

// module.exports is how you export data in Node.js so that you can require() it in other files.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('user-info')
        .setDescription('Display info about yourself.'),
    async execute(interaction) {
        return interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
    },
};