const { PermissionFlagsBits, EmbedBuilder, Embed, PermissionsBitField } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')
const { GROUP_ID } = require('../config.json')
const noblox = require('noblox.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pass')
		.setDescription('Pass someone to make them a staff member and give them level 1 admin')
		.addStringOption(option =>
			option
				.setName('userid')
				.setDescription('UserID to pass.')
                .setRequired(true))
        .addUserOption(option => 
            option
                .setName('target')
                .setDescription('Put the discord username that passed')
                .setRequired(true))        
        .addStringOption(option =>
            option
                 .setName('reason')
                  .setDescription('Set a reason why this person passed.')
                  .setRequired(true)),
        async execute(interaction, client, Message) {
            try {
            const userID = interaction.options.getString('userid')
            const target = interaction.options.getMember('target')
            const reason = interaction.options.getString('reason')
            const RankName = noblox.getRankInGroup(GROUP_ID, userID)
            let username = await noblox.getUsernameFromId(userID)


			if (!interaction.member.roles.cache.has('1212524055752605886')) return await interaction.reply(`You don't have the role __**'Admin Level 3'**__ to run this command!`)

            function rankUser() {
                noblox.setRank(GROUP_ID, userID, '[M1] Junior Moderator')
            }    
            target.roles.add(target.guild.roles.cache.find(role => role.name === "Junior Moderator"))
            target.roles.add(target.guild.roles.cache.find(role => role.name === "—— MOD ——"))

            const Embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`You have passed user: ${username} to Junior Moderator! | ${reason}`)
            .setFooter({ text: `Made by RobloxSupp515 | Founder (if the user hasn't been ranked, is mostly that you are trying to pass someone above me)` })

            interaction.reply({ embeds: [Embed] })
            } catch (error) {
                interaction.reply(`You cannot rank this user!`)
            }
        },    
};