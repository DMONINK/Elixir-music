const { Client, Collection } = require("discord.js");
const array = [];
const { readdirSync } = require("fs");
const mongoose = require('mongoose');
const { Database } = require("quickmongo");
const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify")
const client = new Client({
   intents: ["GUILDS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]

});
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");
client.db = new Database(client.config.mongourl);
client.owner = client.config.ownerID;
client.prefix = client.config.prefix;
client.embedColor = client.config.embedColor;
client.aliases = new Collection();
client.commands = new Collection();
client.categories = readdirSync("./commands/");
client.logger = require("./utils/logger.js");
client.emoji = require("./utils/emoji.json");

client.manager = new Manager({
    nodes: client.config.nodes,
    send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
    autoPlay: true,
    plugins: [new Spotify({
        clientID: client.config.clientID,
        clientSecret: client.config.clientSecret,
    })]
});

client.on("raw", (d) => client.manager.updateVoiceState(d));
/**
 * Mongodb connection
 */

<<<<<<< HEAD
client.databaseCache = {};

client.guildsData = require("./models/Guild"); // Guild mongoose model
client.databaseCache.guilds = new Discord.Collection();
client.emoji = require("./json/emoji.json");


//login into the bot
mongoose.connect(config.mongo, {
=======
const dbOptions = {
>>>>>>> parent of c88fb0f (major)
  useNewUrlParser: true,
  autoIndex: false,
  poolSize: 5,
  connectTimeoutMS: 10000,
  family: 4,
  useUnifiedTopology: true,
};
  mongoose.connect(client.config.mongourl, dbOptions);
  mongoose.set("useFindAndModify", false);
  mongoose.Promise = global.Promise;
	mongoose.connection.on('connected', () => {
		client.logger.log('[DB] DATABASE CONNECTED', "ready");
		});
	mongoose.connection.on('err', (err) => {
			console.log(`Mongoose connection error: \n ${err.stack}`, "error");
		});
	mongoose.connection.on('disconnected', () => {
			console.log('Mongoose disconnected');
		});
    
/**
 * Error Handler
 */
client.on("disconnect", () => console.log("Bot is disconnecting..."))
client.on("reconnecting", () => console.log("Bot reconnecting..."))
client.on('warn', error => console.log(error));
client.on('error', error => console.log(error));
process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

<<<<<<< HEAD
    if(funny === 'first') {
        const embed1 = new MessageEmbed()
        .setThumbnail(ee.avatara)
        .addField(`${emoji.categories.Playlist} CustomPlaylist - (10)`, `\`pl-addcurrent\`, \`pl-addqueue\`, \`pl-create\`, \`pl-delete\`, \`pl-info\`, \`pl-list\`, \`pl-load\`, \`pl-playshuffle\`, \`pl-removedupes\`, \`pl-removetrack\`\n\n[Invite](${config.links.opbotinv}) ● [Support Server](${config.links.server})`)
        .setDescription("● To get help on a specific command type `@Gaara help <command>`!")
        .setColor("#303037")
        .setFooter("Gaara Labs", ee.avatara)
        .setTimestamp()
        interaction.reply({ embeds: [embed1], ephemeral: true })
        return
    }

    if(funny === 'second') {
        const embed2 = new MessageEmbed()
        .setThumbnail(ee.avatara)
        .addField(`${emoji.categories.AstrozMusic} Filter - (15)`, `\`8d\`, \`bassboost\`, \`chipmunk\`, \`cleareq\`, \`clearfilter\`, \`darthvader\`, \`equalizer\`, \`nightcore\`, \`pitch\`, \`rate\`, \`slowmo\`, \`speed\`, \`tremolo\`, \`vibrato\`, \`vibrate\`\n\n[Invite](${config.links.opbotinv}) ● [Support Server](${config.links.server})`)
        .setDescription("● To get help on a specific command type `@Gaara help <command>`!")
        .setColor('#303037')
        .setFooter("Gaara Labs", ee.avatara)
        .setTimestamp()
        interaction.reply({ embeds: [embed2], ephemeral: true })
        return
    }

    if(funny === 'third') {
          const embed3 = new MessageEmbed()
        .setThumbnail(ee.avatara)
        .addField(`${emoji.categories.Info} Info - (7)`, `\`djmode\`, \`help\`, \`invite\`, \`ping\`, \`stats\`, \`uptime\`\n\n[Invite](${config.links.opbotinv}) ● [Support Server](${config.links.server})`)
        .setDescription("● To get help on a specific command type `@Gaara help <command>`!")
        .setColor('#303037')
        .setFooter("Gaara Labs", ee.avatara)
        .setTimestamp()
        interaction.reply({ embeds: [embed3], ephemeral: true })
        return

    }

    if(funny === 'fourth') {

         const embed4 = new MessageEmbed()
        .setThumbnail(ee.avatara)
        .addField(`${emoji.categories.Playing} Music - (27)`, `\`autoplay\`, \`back\`, \`clearqueue\`, \`forward\`, \`grab\`, \`join\`, \`loop\`, \`movebot\`, \`moveme\`, \`movetrack\`, \`nowplaying\`, \`pause\`, \`play\`, \`playtop\`, \`queue\`, \`remove\`, \`replay\`, \`resume\`, \`rewind\`, \`search\`, \`seek\`, \`shuffle\`, \`skip\`, \`skipto\`, \`stop\`, \`volume\`, \`voteskip\`\n\n[Invite](${config.links.opbotinv}) ● [Support Server](${config.links.server})`)
        .setDescription("● To get help on a specific command type `@Gaara help <command>`!")
        .setColor('#303037')
        .setFooter("Gaara Labs", ee.avatara)
        .setTimestamp()
        interaction.reply({ embeds: [embed4], ephemeral: true })
        return

    }

    

    
     if (funny === 'fifth') {
        const embed6 = new MessageEmbed()
        .setThumbnail(ee.avatara)
        .addField(`${emoji.categories.Settings} Settings - (11)`, `\`24/7\`, \`adddj\`, \`announce\`, \`prefix\`, \`removedj\`, \`reset\`, \`settings\`, \`setdjonly\`, \`pruning\`\n\n[Invite](${config.links.opbotinv}) ● [Support Server](${config.links.server})`)
        .setDescription("● To get help on a specific command type `@Gaara help <command>`!")
        .setColor('#303037')
        .setFooter("Gaara Labs", ee.avatara)
        .setTimestamp()
        interaction.reply({ embeds: [embed6], ephemeral: true })
        return
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const { createBar, format, autoplay } = require(`./handlers/functions`);

    const { channel } = interaction.member.voice;

    const nomusic = new MessageEmbed()
    .setDescription(`${emoji.msg.ERROR} There is nothing playing`)
    .setColor(ee.color)

    const empty = new MessageEmbed()
    .setTitle('No song currently playing')
    .setDescription(`[Invite](${config.links.opbotinv}) • [Support server](${config.links.server})`)
    .setColor(ee.color)
    .setImage(ee.nosongbanner)

    let playrow = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("reducev")
        .setEmoji(emoji.msg.reduce_volume),
        new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("previous")
        .setEmoji(emoji.msg.previous_track),
        new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("pause-play")
        .setEmoji(emoji.msg.pause_resume),
        new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("skip")
        .setEmoji(emoji.msg.skip_track),
        new MessageButton()
        .setStyle("SECONDARY")
        .setCustomId("raisev")
        .setEmoji(emoji.msg.raise_volume)
    )

    interaction.deferUpdate().catch(() => {
        return
    })

    const player = client.manager.players.get(interaction.guild.id);
    // const setup = client.manager.setups.get(interaction.guild.id);

    console.log(client.setups)
    
    if (!channel) {
        const opop = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setDescription(`${emoji.msg.ERROR} You need to join a voice channel.`)
        return interaction.followUp({ embeds: [opop] });
    }

    if(player === undefined) {
        if(interaction.channel.name === 'gaara-request') {
            setTimeout(() => {
                interaction.editReply({ embeds: [empty], components: [playrow] })
            }, 300)
        }
        setTimeout(() => {
            interaction.followUp({ embeds: [nomusic], ephemeral: true })
        }, 500)
        return
    }

    if(interaction.customId === 'reducev') {
        if(player.volume === '0') {
            const yto = new MessageEmbed()
            .setDescription(`${emoji.msg.raise_volume} Volume way to quiet at \`${player.volume} %\``)
            .setColor(ee.color)
            interaction.followUp({ embeds: [yto] }).then(responce => {
                setTimeout(() => {
                    try {
                        responce.delete().catch(() => {
                            return
                        })
                    } catch(err) {
                        return
                    }
                }, 12000)
            })
            return
        }
        
        player.setVolume(player.volume - 10); // Keep it I wanna know if it works

        const yto = new MessageEmbed()
        .setDescription(`${emoji.msg.raise_volume} Volume set to \`${player.volume} %\``)
        .setColor(ee.color)
        interaction.followUp({ embeds: [yto] }).then(responce => {
            setTimeout(() => {
                try {
                    responce.delete().catch(() => {
                        return
                    })
                } catch(err) {
                    return
                }
            }, 12000)
        })
    }

    if(interaction.customId === 'previous') {
        const yto = new MessageEmbed()
        .setDescription(`**${emoji.msg.ERROR} Sorry we havent figured out playing the\nprevious song please try agian later.**`)
        .setColor(ee.color)
        interaction.followUp({ embeds: [yto] }).then(responce => {
            setTimeout(() => {
                try {
                    responce.delete().catch(() => {
                        return
                    })
                } catch(err) {
                    return
                }
            }, 12000)
        })
    }

    if(interaction.customId === 'pause-play') {
        if(player.paused === true) {
            player.pause(false);
        } else {
            player.pause(true);
        }

        const yto = new MessageEmbed()
        .setTitle(`${player.playing ? `${emoji.msg.resume} Resumed` : `${emoji.msg.pause} Paused`} the Player.`)
        .setColor(ee.color)
        .addField(`${emoji.msg.Playing} Progress: `, createBar(player))
        interaction.followUp({ embeds: [yto] }).then(responce => {
            setTimeout(() => {
                try {
                    responce.delete().catch(() => {
                        return
                    })
                } catch(err) {
                    return
                }
            }, 12000)
        })
    }

    if(interaction.customId === 'skip') {
        if(player.queue.size == 0) {
            if(player.get("autoplay")) {
                const idkd = new MessageEmbed()
                .setDescription(`${emoji.msg.skip_track} Skipped **${player.queue.current.title}** by \`${message.author.tag}\``)
                .setColor(ee.color)
                message.channel.send({embeds: [idkd]});
                return autoplay(client, player, "skip")
            } else {
                player.stop();
                const idkd = new MessageEmbed()
                .setDescription(`${emoji.msg.skip_track} Skipped **${player.queue.current.title}** by \`${message.author.tag}\``)
                .setColor(ee.color)
                return message.channel.send({embeds: [idkd]});
            }
        }

        player.stop();
        const yto = new MessageEmbed()
        .setDescription(`${emoji.msg.skip_track} Skipped *${player.queue.current.title}*`)
        .setColor(ee.color)
        interaction.followUp({ embeds: [yto] }).then(responce => {
            setTimeout(() => {
                try {
                    responce.delete().catch(() => {
                        return
                    })
                } catch(err) {
                    return
                }
            }, 12000)
        })
    }

    if(interaction.customId === 'raisev') {
        player.setVolume(player.volume + 10); // Keep it I wanna know if it works

        if (player.volume < 0 || player.volume > 150) {
            const yto = new MessageEmbed()
            .setDescription(`${emoji.msg.raise_volume} Volume is way to high at \`${player.volume} %\``)
            .setColor(ee.color)
            interaction.followUp({ embeds: [yto] }).then(responce => {
                setTimeout(() => {
                    try {
                        responce.delete().catch(() => {
                            return
                        })
                    } catch(err) {
                        return
                    }
                }, 12000)
            })
            return
        }
        const yto = new MessageEmbed()
        .setDescription(`${emoji.msg.raise_volume} Volume set to \`${player.volume} %\``)
        .setColor(ee.color)
        interaction.followUp({ embeds: [yto] }).then(responce => {
            setTimeout(() => {
                try {
                    responce.delete().catch(() => {
                        return
                    })
                } catch(err) {
                    return
                }
            }, 12000)
        })
    }
})

//new MessageButton()
  //  .setStyle("SECONDARY")
 //   .setCustomId("reducev")
  // .setEmoji("🔉"),
  //  new MessageButton()
   // .setStyle("SECONDARY")
   // .setCustomId("previous")
   // .setEmoji("⏮️"),
//new MessageButton()
   // .setStyle("SECONDARY")
   // .setCustomId("stop")
   // .setEmoji("⏹️"),
//new MessageButton()
  //  .setStyle("SECONDARY")
   // .setCustomId("skip")
   // .setEmoji("⏭️"),
//new MessageButton()
  //  .setStyle("SECONDARY")
   // .setCustomId("raisev")
   // .setEmoji("🔊")

  
  
   

client.on('guildCreate', async (guild) => {
    try {
        const owner = await guild.fetchOwner()
        const embed = new Discord.MessageEmbed()           
        .setTitle("Joined A New Server")
        .setColor("GREEN")
        .setThumbnail(guild.iconURL())
        .setDescription("<@768058720621821954> has joined a server!")
        .addField("**Server Name**", guild.name, true)
        .addField("**Server ID**", guild.id, true)
        .addField("**Owner**", `Tag - ${owner.user.tag}\nID - ${owner.id}`, true)
        .addField("**Members**", `${guild.memberCount} + <@732916004656513077>`, true)
    try { embed.addField("**Region**", guild.region, true) } catch {/** */}
    
    client.channels.cache.get("909107821096882196").send({embeds: [embed]})
  } catch (e) { console.log(e) }


  try {

    
    const guildData = await findOrCreateGuild(client, { id: guild.id });
    let prefix = guildData.prefix;
    const ownerlmao = await guild.fetchOwner()

    if (prefix === null) prefix = config.prefix;
    guildData.announce = true;
    guildData.save();
  
    const texts = "Thanks for adding Gaara to your server! If you need help regarding the bot, you may reach us out at https://discord.gg/zvynSK7Crk"
    const guildembed = new Discord.MessageEmbed()
    .setTitle("Thank you for adding me in your server! ❤️")
    .setColor("#303037")

    .setDescription(`\`\`\`fix\nMy prefix is ${prefix}\nrun ${prefix}help or ${prefix}commands\nto access the help menu
You can change the prefix using ${prefix}prefix <New Prefix>\`\`\``);
 ownerlmao.send({content: texts, embeds: [guildembed]});
  } catch {/** */}
=======
/**
 * Client Events
 */
readdirSync("./events/Client/").forEach(file => {
    const event = require(`./events/Client/${file}`);
    let eventName = file.split(".")[0];
    client.logger.log(`Loading Events Client ${eventName}`, "event");
    client.on(eventName, event.bind(null, client));
>>>>>>> parent of c88fb0f (major)
});

/**
 * Erela Manager Events
 */
readdirSync("./events/Lavalink/").forEach(file => {
    const event = require(`./events/Lavalink/${file}`);
    let eventName = file.split(".")[0];
    client.logger.log(`Loading Events Lavalink ${eventName}`, "event");
    client.manager.on(eventName, event.bind(null, client));
});

/**
 * Import all commands
 */
readdirSync("./commands/").forEach(dir => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        client.logger.log(`Loading ${command.category} commands ${command.name}`, "cmd");
        client.commands.set(command.name, command);
    }
});


client.login(client.config.token);