const { PermissionFlagsBits, EmbedBuilder, Embed, PermissionsBitField } = require('discord.js');
const { SlashCommandBuilder, messageLink } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Select a member and ban them.')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for banning'))
		.setDMPermission(false),
        async execute(interaction, client) {
			if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers) || interaction.member.id !== "1039000424755241022") return await interaction.reply({ content: "You don't have permission to ban members!", ephemeral: true});
            const target = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';

			const dmEmbed = new EmbedBuilder()
			.setColor('Red')
			.setTitle(`${interaction.guild.name}`)
			.setDescription(`You have been banned by ${interaction.user.username} with the reason ${reason}`)
			.setFooter({ text: 'Harvey Moderation' })

            target.send({ embeds: [dmEmbed] }, 'content');
            await interaction.guild.members.ban(target);

			const logEmbed = new EmbedBuilder()
			.setColor('Red')
			.setTitle(`${target.username}`)
			.setDescription(`You have banned ${target.username} for the reason ${reason}`)
			.setFooter({ 
				text: 'Harvey Moderation',
				iconURL: 'https://cdn.discordapp.com/avatars/1204166128738238464/4c67a734eda5501b54ce13a37200a396.webp?size=80' 
			})

			await interaction.reply({ embeds: [logEmbed] })
        },    
};