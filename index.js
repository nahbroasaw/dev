const { GatewayIntentBits, REST, Client, Collection, Events, ActivityType, Routes, Message, EmbedBuilder } = require('discord.js')
const fs = require('fs')
const mongoose = require('mongoose');
const { Token, ENV, MongoURL, ROBLOX_COOKIE, GROUP_ID } = require('./config.json')
const noblox = require('noblox.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction, client, Message);
		console.log(client)
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on('ready', (user) => {
  console.log("Bot is online!")
	const CLIENT_ID = client.user.id;

    client.user.setActivity('Harvey Studio', { type: ActivityType.Watching });
	const rest = new REST({
		version: "9"
	}).setToken(Token)

	const Roblox = noblox.setCookie(ROBLOX_COOKIE)
	Roblox.then(function() {
		console.log(`Logged in to the main bot.`)
	}).catch(function(err) {
		console.log(`Noblox caught an error: ${err}`)
	})

	//rest.delete(Routes.applicationCommand('1212174322865807432', '1212513279977725992'))
    //.then(() => console.log(`Successfully deleted application command`))
    //.catch(console.error);
	async function print(print) {
		console.log(print)
	}

	async function startMongoDB() {
		if (!MongoURL) return;
		await mongoose.connect(MongoURL || ``, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		if (mongoose.connect) {
			console.log(
			`
			____________MONGOOSE____________

			    CONNECTED TO THE DATABASE

			____________MONGOOSE____________
			`)
		} else {
			console.log(
				`
				____________MONGOOSE____________
	
				     FAILED TO CONNECT TO THE 
				            DATABASE
					
				____________MONGOOSE____________
				`)
		}
	}

	startMongoDB();

	(async () => {
        try {
	        if (ENV == "Production") {
				await rest.put(Routes.applicationCommands(CLIENT_ID), {
					body: commands
				});
				console.log("Successfully registered commands globally.")
			} else {
				await rest.put(Routes.applicationGuildCommand(CLIENT_ID, GUILD_ID), {
					body: commands
				});
				console.log("Successfully registered commands locally.");
			}
		} catch (err) {
			if (err) console.error(err);
		}
	})();
})

client.on(Events.InteractionCreate, (interaction) => {
	if (!interaction.isAutocomplete()) return;
	if (interaction.commandName !== 'setstaffrole') return;

	const focusedValue = interaction.options.getFocused();
	console.log(focusedValue)
});

client.login(Token)