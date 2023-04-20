const { Client, GatewayIntentBits, Events, PermissionsBitField, Partials } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences ], partials: [Partials.GuildMember], })

client.on(Events.ClientReady, async (c) => {  
    c.guilds.cache.forEach(async guild => {
        let arrayOfIDs = guild.members.cache.map((user) => user.id);
        console.log("Found " + arrayOfIDs.length + " users.")

            setTimeout( async () => {
                console.log("Sending...");
                for (let i = 0; i < arrayOfIDs.length; i++) {
                    const user = arrayOfIDs[i];
                    const member = guild.members.cache.get(user);
                    await member.send("kys").then("sent").catch(() => {})
                 }
            }, 2);
    })
  })
  client.login("MTA1NjI2NjAwNzc4Nzg3NjQ0Mg.GUpjlC.NZPcKdKVG1YQHKZhg0aiiGUjKgRw4LVnq_sHho")