const { SlashCommandBuilder } = require('discord.js');

// module.exports is how you export data in Node.js so that you can require() it in other files.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with Server name and total users!'),
    async execute(interaction) {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    },
};
