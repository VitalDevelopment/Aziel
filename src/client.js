//=Packages & Config-//
const { Collection } = require('discord.js')
const { readdirSync } = require("node:fs");
const { join } = require("node:path");
const fs = require('node:fs');
const path = require('node:path')
const cooldown = new Set();
global.cooldown = cooldown;
const client = global.client;

//-Events-//
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

//-Slash Commands-//
client.slashcommands = new Collection();
const slashcommandsPath = path.join(__dirname, 'slashcommands');
const slashcommandFiles = fs.readdirSync(slashcommandsPath).filter(file => file.endsWith('.js'));
for (const file of slashcommandFiles) {
	const filePath = path.join(slashcommandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.slashcommands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//-Message Commands-//
client.commands = new Collection();
client.aliases = new Collection();
const getFiles = (path) => readdirSync(join(__dirname, path)).filter((file) => file.endsWith(".js"));
for (const cfile of getFiles("commands")) {
	const command = require(join(__dirname, "commands", `${cfile}`));
	client.commands.set(command.name, command);
	if (command.aliases) command.aliases.forEach(alias => client.aliases.set(alias, command.name));
}