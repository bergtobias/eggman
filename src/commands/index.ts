import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { configDotenv } from "dotenv";

configDotenv();

const commands = [
  new SlashCommandBuilder()
    .setName("scramble")
    .setDescription("Scramble members in your voice channel into two teams")
    .toJSON(),
  new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Roll a random number")
    .addStringOption((option) =>
      option
        .setName("range")
        .setDescription('Range in format "max" or "min-max" (default: 1-100)')
    ),
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

(async () => {
  try {
    console.log("Registering slash commands...");

    // Register commands globally (for all servers)
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), {
      body: commands,
    });

    console.log("Slash commands registered successfully!");
  } catch (error) {
    console.error("Failed to register slash commands:", error);
  }
})();
