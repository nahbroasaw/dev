const { PermissionFlagsBits, EmbedBuilder, Embed, PermissionsBitField } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')
const { GROUP_ID } = require('../config.json')
const noblox = require('noblox.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shout')
		.setDescription('Sends a roblox shout.')
		.addStringOption(option =>
			option
				.setName('shout')
				.setDescription('Provide a string to post in the shout.')
                .setRequired(true))
		.setDMPermission(false),
        async execute(interaction, client, Message) {
            const getString = interaction.options.getString('shout')
			if (!interaction.member.roles.cache.has('1212523992594784256')) return await interaction.reply(`You don't have the role __**'Admin Level 1'**__ to run this command!`)

            noblox.shout(GROUP_ID, `Harvey Administration | ${getString}`)
            const Embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`You set the shout to ${getString} with a return of __**Success!**__`)
            .setFooter({ text: `Made by RobloxSupp515 | Founder` })

            interaction.reply({ embeds: [Embed] })
        },    
};