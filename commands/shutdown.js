const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('shutdown')
    .setDescription(`Shut down your discord bot`),
    async execute (interaction, client) {

        if (interaction.user.id != '1039000424755241022') return;
        else {

            const embed = new EmbedBuilder()
            .setColor('Blue')
            .setDescription(`🛠️ Your bot has been shut down`)

            await interaction.reply({ content: '<a:Loading:1087045463980658751> Shutting down your bot...', ephemeral: false });
            await client.user.setStatus('invisible')

            setTimeout(async () => {
                await interaction.editReply({ content: ``, embeds: [embed] });
                process.exit();
            }, 2000)
        }
    }
}