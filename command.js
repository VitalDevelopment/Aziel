const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const config = require("./config.js")

const commands = [];
const commandFiles = fs.readdirSync('./src/slashcommands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./src/slashcommands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.bot.token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands("829896567963910164"),
			{ body: commands },
		).catch(() => {})

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
