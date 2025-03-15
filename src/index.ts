import { Client, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import { readyHandler } from "./ready.ts";
import { configDotenv } from "dotenv";
import { scrambleTeams } from "./commands/scramble.ts";
import { roll } from "./commands/roll.ts";

configDotenv();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Needed to read message content
    GatewayIntentBits.GuildVoiceStates, // Needed for voice channel members
  ],
  shards: "auto", // Automatically manages sharding
});

client.once(Events.ClientReady, readyHandler);
client.on(Events.InteractionCreate, async (interaction) => {
  console.log("Command received");
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;

  try {
    switch (commandName) {
      case "roll":
        await roll(interaction);
        break;
      case "scramble":
        await scrambleTeams(interaction);
        break;
    }
  } catch (error) {
    console.error(`Error handling command ${commandName}:`, error);
    await interaction.reply({
      content: "There was an error executing this command!",
      flags: MessageFlags.Ephemeral,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
