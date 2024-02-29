const { PermissionFlagsBits, EmbedBuilder, Embed, PermissionsBitField } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')
const { GROUP_ID } = require('../config.json')
const noblox = require('noblox.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setrank')
		.setDescription('Set a user id role')
		.addStringOption(option =>
			option
				.setName('userid')
				.setDescription('UserID to rank.')
                .setRequired(true))
        .addStringOption(option =>
            option
                 .setName('rolename')
                  .setDescription('Role name to set the specific user to rank.')
                  .setRequired(true)),
        async execute(interaction, client, Message) {
            const userID = interaction.options.getString('userid')
            const roleName = interaction.options.getString('rolename')
			if (!interaction.member.roles.cache.has('1212524096139825153')) return await interaction.reply(`You don't have the role __**'Admin Level 4'**__ to run this command!`)

            noblox.setRank(GROUP_ID, userID, roleName)

            const Embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`You changed user ID: ${userID} to ${roleName}`)
            .setFooter({ text: `Made by RobloxSupp515 | Founder` })

            interaction.reply({ embeds: [Embed] })
        },    
};