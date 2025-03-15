import { ChatInputCommandInteraction, MessageFlags } from "discord.js";

export async function roll(interaction: ChatInputCommandInteraction) {
  // No need for isCommand() check since we're using specific interaction type
  const input = interaction.options.getString("range") ?? "100";

  const rangePattern = /^(\d+)(?:-(\d+))?$/;
  const match = input.match(rangePattern);

  if (!match) {
    return interaction.reply({
      content: "❌ Invalid format. Use `/roll` or `/roll 10-25`",
      flags: MessageFlags.Ephemeral,
    });
  }

  let min = 1;
  let max = parseInt(match[1]!, 10);

  if (match[2]) {
    min = max;
    max = parseInt(match[2], 10);
  }

  if (min >= max) {
    return interaction.reply({
      content: "❌ Minimum value must be less than maximum",
      flags: MessageFlags.Ephemeral,
    });
  }

  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  await interaction.reply(`🎲 You rolled a ${result} (${min}-${max})`);
}
