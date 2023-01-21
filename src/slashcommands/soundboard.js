const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const voiceDiscord = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('soundboard')
    .setDescription('Cool soundboard thing.')
    .addSubcommand(subcommand => 
        subcommand
        .setName("bruh")
        .setDescription("Play the \"bruh\" sound effect.")
    )
        .addSubcommand(subcommand => 
            subcommand
            .setName("i-am-a")
            .setDescription("Play the \"bruh\" sound effect.")
            )
            .addSubcommand(subcommand => 
                subcommand
                .setName("knock")
                .setDescription("play the \"knocking\" sound effect.")
				)
				.addSubcommand(subcommand => 
					subcommand
					.setName("fakenews")
					.setDescription("play the \"fake news\" sound effect.")
					)
					.addSubcommand(subcommand => 
						subcommand
						.setName("saywhat")
						.setDescription("play the \"say what\" sound effect.")
						).addSubcommand(subcommand => 
							subcommand
							.setName("garbageee")
							.setDescription("play the \"garbageee\" sound effect."))
						,
  async execute(interaction, client) {
    await interaction.deferReply().catch(() => {});

    const channel = interaction.member.voice.channel;
    if(!channel) return interaction.editReply('Okay genius, join a voice channel.');

    if (interaction.options.getSubcommand() === 'bruh') {

		const player = voiceDiscord.createAudioPlayer();
		const resource = voiceDiscord.createAudioResource('https://azielbot.xyz/assets/bruh.mp3');

		const connection = voiceDiscord.joinVoiceChannel({
			channelId: channel.id,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		player.play(resource);
		connection.subscribe(player);

		interaction.editReply({ content: `${interaction.user} played the "bruh" sound effect.`})

		player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
			connection.destroy();
		});

    } else if (interaction.options.getSubcommand() === 'i-am-a') {
        const player = voiceDiscord.createAudioPlayer();
		const resource = voiceDiscord.createAudioResource('https://cdn.discordapp.com/attachments/1054197226299211776/1061845742848856174/i-am-a-registered-seggs-offender.mp3');

		const connection = voiceDiscord.joinVoiceChannel({
			channelId: channel.id,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		player.play(resource);
		connection.subscribe(player);

		interaction.editReply({ content: `${interaction.user} played the "I am a registered ~~sex~~ offender." sound effect.`})

		player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
			connection.destroy();
		});
    } else if (interaction.options.getSubcommand() === 'knock') {
        const player = voiceDiscord.createAudioPlayer();
		const resource = voiceDiscord.createAudioResource('https://cdn.discordapp.com/attachments/1054197226299211776/1061859840173015070/crazy-realistic-knocking-sound-trim.mp3');

		const connection = voiceDiscord.joinVoiceChannel({
			channelId: channel.id,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		player.play(resource);
		connection.subscribe(player);

		interaction.editReply({ content: `${interaction.user} played the "knocking" sound effect.`})

		player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
			connection.destroy();
		});
    } else if (interaction.options.getSubcommand() === 'fakenews') {
        const player = voiceDiscord.createAudioPlayer();
		const resource = voiceDiscord.createAudioResource('https://cdn.discordapp.com/attachments/1054197226299211776/1062179878071447622/donald-trump-fake-news-sound-effect.mp3');

		const connection = voiceDiscord.joinVoiceChannel({
			channelId: channel.id,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		player.play(resource);
		connection.subscribe(player);

		interaction.editReply({ content: `${interaction.user} played the "fake news" sound effect.`})

		player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
			connection.destroy();
		});
    } else if (interaction.options.getSubcommand() === 'saywhat') {
        const player = voiceDiscord.createAudioPlayer();
		const resource = voiceDiscord.createAudioResource('https://cdn.discordapp.com/attachments/1054197226299211776/1062180934423691264/stewie-say-whaaaaaaat.mp3');

		const connection = voiceDiscord.joinVoiceChannel({
			channelId: channel.id,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		player.play(resource);
		connection.subscribe(player);

		interaction.editReply({ content: `${interaction.user} played the "say what" sound effect.`})

		player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
			connection.destroy();
		});
    } else if (interaction.options.getSubcommand() === 'garbageee') {
        const player = voiceDiscord.createAudioPlayer();
		const resource = voiceDiscord.createAudioResource('https://cdn.discordapp.com/attachments/1054197226299211776/1062181548587237466/still-a-piece-of-garbage_KJxlB13.mp3');

		const connection = voiceDiscord.joinVoiceChannel({
			channelId: channel.id,
			guildId: interaction.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		player.play(resource);
		connection.subscribe(player);

		interaction.editReply({ content: `${interaction.user} played the "garbageee" sound effect.`})

		player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
			connection.destroy();
		});
    }
  },
};